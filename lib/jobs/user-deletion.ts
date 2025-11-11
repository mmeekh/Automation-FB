import { DeletionStatus } from '@prisma/client';
import prisma from '@/lib/db';
import { collectUserImages, deleteMultipleImages } from '@/lib/storage/images';

type UserDeletionJobParams = {
  userId: string;
  confirmationCode: string;
};

const JOB_DELAY_MS = Number(process.env.USER_DELETION_JOB_DELAY_MS ?? 1_000);

/**
 * Collect and delete all images associated with the user
 */
const collectAndDeleteImages = async (userId: string) => {
  try {
    const imageUrls = await collectUserImages(userId);

    if (imageUrls.length === 0) {
      console.log(`[DELETION] No images found for user ${userId}`);
      return;
    }

    const result = await deleteMultipleImages(imageUrls);
    console.log(
      `[DELETION] Image deletion completed: ${result.success} success, ${result.failed} failed`
    );
  } catch (error) {
    console.error('[DELETION] Failed to collect/delete images:', error);
    // Don't throw - continue with user deletion even if image cleanup fails
  }
};

const executeDeletionJob = async ({ userId, confirmationCode }: UserDeletionJobParams) => {
  await collectAndDeleteImages(userId);

  await prisma.dmSession.deleteMany({
    where: { instagramAccount: { userId } },
  });

  await prisma.automationFlow.deleteMany({
    where: { userId },
  });

  await prisma.instagramAccount.deleteMany({
    where: { userId },
  });

  await prisma.event.deleteMany({
    where: { userId },
  });

  await prisma.user.delete({
    where: { id: userId },
  });

  await prisma.deletionRequest.update({
    where: { confirmationCode },
    data: {
      status: DeletionStatus.COMPLETED,
      completedAt: new Date(),
    },
  });
};

export const queueUserDeletion = ({ userId, confirmationCode }: UserDeletionJobParams) => {
  const run = async () => {
    try {
      await executeDeletionJob({ userId, confirmationCode });
      console.info(`✅ User deletion completed for ${userId}`);
    } catch (error) {
      console.error('User deletion job failed:', error);
      await prisma.deletionRequest.update({
        where: { confirmationCode },
        data: {
          status: DeletionStatus.FAILED,
        },
      });
    }
  };

  setTimeout(() => {
    void run();
  }, JOB_DELAY_MS);
};

export default queueUserDeletion;
