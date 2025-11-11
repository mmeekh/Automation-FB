/**
 * Image Storage Management
 * Supports both AWS S3 and Cloudflare R2 (S3-compatible)
 */

import { S3Client, DeleteObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';

// Storage configuration
const STORAGE_PROVIDER = process.env.STORAGE_PROVIDER || 's3'; // 's3' or 'r2'
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const S3_BUCKET = process.env.S3_BUCKET;

// Cloudflare R2 specific configuration
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET;

/**
 * Initialize S3 client based on storage provider
 */
const getS3Client = (): S3Client => {
  if (STORAGE_PROVIDER === 'r2') {
    // Cloudflare R2 configuration
    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
      throw new Error('R2 credentials not configured');
    }

    return new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });
  } else {
    // AWS S3 configuration
    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
      throw new Error('AWS S3 credentials not configured');
    }

    return new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }
};

/**
 * Get bucket name based on provider
 */
const getBucketName = (): string => {
  const bucket = STORAGE_PROVIDER === 'r2' ? R2_BUCKET : S3_BUCKET;
  if (!bucket) {
    throw new Error(`Bucket name not configured for provider: ${STORAGE_PROVIDER}`);
  }
  return bucket;
};

/**
 * Extract S3 key from full URL
 * @param url - Full S3/R2 URL (e.g., https://bucket.s3.amazonaws.com/path/to/image.jpg)
 * @returns S3 object key (e.g., path/to/image.jpg)
 */
export const extractKeyFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);

    // Handle S3 URL formats:
    // 1. https://bucket.s3.amazonaws.com/key
    // 2. https://s3.amazonaws.com/bucket/key
    // 3. https://bucket.s3.region.amazonaws.com/key
    // 4. https://accountid.r2.cloudflarestorage.com/bucket/key

    const pathname = urlObj.pathname;

    // Remove leading slash and bucket name if present
    let key = pathname.startsWith('/') ? pathname.slice(1) : pathname;

    // For R2 URLs, remove bucket name from path
    if (STORAGE_PROVIDER === 'r2' && R2_BUCKET) {
      const bucketPrefix = `${R2_BUCKET}/`;
      if (key.startsWith(bucketPrefix)) {
        key = key.slice(bucketPrefix.length);
      }
    }

    return key || null;
  } catch (error) {
    console.error('Failed to extract key from URL:', url, error);
    return null;
  }
};

/**
 * Delete a single image from storage
 * @param url - Full URL of the image to delete
 * @returns Promise<boolean> - true if deleted successfully
 */
export const deleteImageFromStorage = async (url: string): Promise<boolean> => {
  try {
    // Skip if storage not configured (development mode)
    if (!AWS_ACCESS_KEY_ID && !R2_ACCESS_KEY_ID) {
      console.warn(`[STORAGE] Skipping deletion (not configured): ${url}`);
      return true;
    }

    const key = extractKeyFromUrl(url);
    if (!key) {
      console.error(`[STORAGE] Invalid URL, cannot extract key: ${url}`);
      return false;
    }

    const s3Client = getS3Client();
    const bucket = getBucketName();

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    );

    console.log(`[STORAGE] Deleted: ${key} from ${bucket}`);
    return true;
  } catch (error) {
    console.error(`[STORAGE] Failed to delete image: ${url}`, error);
    return false;
  }
};

/**
 * Delete multiple images from storage (batch operation)
 * @param urls - Array of full URLs to delete
 * @returns Promise<{ success: number, failed: number }> - Deletion summary
 */
export const deleteMultipleImages = async (
  urls: string[]
): Promise<{ success: number; failed: number }> => {
  // Skip if storage not configured
  if (!AWS_ACCESS_KEY_ID && !R2_ACCESS_KEY_ID) {
    console.warn(`[STORAGE] Skipping batch deletion (not configured): ${urls.length} images`);
    return { success: urls.length, failed: 0 };
  }

  if (urls.length === 0) {
    return { success: 0, failed: 0 };
  }

  // Extract keys and filter out invalid URLs
  const keys = urls.map(extractKeyFromUrl).filter((key): key is string => key !== null);

  if (keys.length === 0) {
    console.warn('[STORAGE] No valid keys to delete');
    return { success: 0, failed: urls.length };
  }

  try {
    const s3Client = getS3Client();
    const bucket = getBucketName();

    // S3 DeleteObjects supports up to 1000 objects per request
    const BATCH_SIZE = 1000;
    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batch = keys.slice(i, i + BATCH_SIZE);

      try {
        await s3Client.send(
          new DeleteObjectsCommand({
            Bucket: bucket,
            Delete: {
              Objects: batch.map((key) => ({ Key: key })),
              Quiet: true, // Only return errors
            },
          })
        );

        successCount += batch.length;
        console.log(`[STORAGE] Deleted batch: ${batch.length} images from ${bucket}`);
      } catch (error) {
        console.error(`[STORAGE] Failed to delete batch:`, error);
        failedCount += batch.length;
      }
    }

    return { success: successCount, failed: failedCount };
  } catch (error) {
    console.error('[STORAGE] Batch deletion failed:', error);
    return { success: 0, failed: keys.length };
  }
};

/**
 * Collect all image URLs from user's data
 * @param userId - User ID to collect images for
 * @returns Promise<string[]> - Array of image URLs
 */
export const collectUserImages = async (userId: string): Promise<string[]> => {
  const { prisma } = await import('@/lib/db');

  const imageUrls: string[] = [];

  try {
    // 1. Collect from DM sessions
    const dmSessions = await prisma.dmSession.findMany({
      where: {
        instagramAccount: {
          userId,
        },
      },
      select: {
        userImages: true,
        generatedImages: true,
      },
    });

    for (const session of dmSessions) {
      imageUrls.push(...session.userImages);
      imageUrls.push(...session.generatedImages);
    }

    // 2. Collect from user profile (if stored)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { picture: true },
    });

    if (user?.picture && user.picture.startsWith('http')) {
      // Only include if it's from our storage (not Facebook CDN)
      if (user.picture.includes(S3_BUCKET || '') || user.picture.includes(R2_BUCKET || '')) {
        imageUrls.push(user.picture);
      }
    }

    // 3. Collect from Instagram account profile pictures (if stored in our storage)
    const instagramAccounts = await prisma.instagramAccount.findMany({
      where: { userId },
      select: { profilePictureUrl: true },
    });

    for (const account of instagramAccounts) {
      if (
        account.profilePictureUrl &&
        (account.profilePictureUrl.includes(S3_BUCKET || '') ||
          account.profilePictureUrl.includes(R2_BUCKET || ''))
      ) {
        imageUrls.push(account.profilePictureUrl);
      }
    }

    // Remove duplicates
    const uniqueUrls = [...new Set(imageUrls)];
    console.log(`[STORAGE] Collected ${uniqueUrls.length} images for user ${userId}`);

    return uniqueUrls;
  } catch (error) {
    console.error('[STORAGE] Failed to collect user images:', error);
    return [];
  }
};
