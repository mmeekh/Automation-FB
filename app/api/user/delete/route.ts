import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import verifySignedRequest from '@/lib/facebook/verify-signed-request';
import { queueUserDeletion } from '@/lib/jobs/user-deletion';

export const runtime = 'nodejs';

/**
 * Extract signed_request from multiple possible sources
 * Priority: Body (JSON/form) -> Query params
 * Supports: application/json, application/x-www-form-urlencoded, multipart/form-data
 */
const extractSignedRequest = async (request: NextRequest): Promise<string | null> => {
  const contentType = request.headers.get('content-type') ?? '';

  // Helper to validate string value
  const isValidString = (value: unknown): value is string => {
    return typeof value === 'string' && value.length > 0;
  };

  try {
    // 1. Try JSON body
    if (contentType.includes('application/json')) {
      const body = await request.json().catch(() => null);
      if (body && typeof body === 'object') {
        const value = body['signed_request'] ?? body['signedRequest'];
        if (isValidString(value)) return value;
      }
    }

    // 2. Try URL-encoded form
    else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      const value = params.get('signed_request') ?? params.get('signedRequest');
      if (isValidString(value)) return value;
    }

    // 3. Try multipart form-data
    else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData().catch(() => null);
      if (formData) {
        const value = formData.get('signed_request') ?? formData.get('signedRequest');
        if (isValidString(value)) return value;
      }
    }
  } catch (error) {
    console.error('[DELETE] Failed to parse request body:', error);
  }

  // 4. Fallback to query params
  const queryValue = request.nextUrl.searchParams.get('signed_request');
  return isValidString(queryValue) ? queryValue : null;
};

export async function POST(request: NextRequest) {
  try {
    // 1. Extract signed_request from request
    const signedRequest = await extractSignedRequest(request);

    if (!signedRequest) {
      console.error('[DELETE] Missing signed_request in request');
      return NextResponse.json({ error: 'signed_request is required' }, { status: 400 });
    }

    // 2. Verify Facebook signature
    let payload;
    try {
      payload = verifySignedRequest(signedRequest);
    } catch (error) {
      console.error('[DELETE] Signature verification failed:', error);
      return NextResponse.json({ error: 'Invalid signed_request' }, { status: 400 });
    }

    // 3. Extract user_id from payload
    const facebookUserId = payload.user_id;
    if (!facebookUserId) {
      console.error('[DELETE] Missing user_id in signed_request payload');
      return NextResponse.json({ error: 'user_id missing in payload' }, { status: 400 });
    }

    console.log(`[DELETE] Processing deletion request for Facebook user: ${facebookUserId}`);

    // 4. Find user in database
    const user = await prisma.user.findUnique({
      where: { facebookId: facebookUserId },
    });

    // 5. Generate confirmation code
    const confirmationCode = crypto.randomBytes(16).toString('hex');

    // 6. Create deletion request (even if user not found - Facebook compliance)
    await prisma.deletionRequest.create({
      data: {
        userId: user?.id ?? null, // Nullable - allows deletion history even after user deleted
        confirmationCode,
      },
    });

    // 7. Queue deletion job only if user exists
    if (user) {
      queueUserDeletion({ userId: user.id, confirmationCode });
      console.log(`[DELETE] Deletion job queued for user: ${user.id}`);
    } else {
      // User not found - mark as completed immediately
      await prisma.deletionRequest.update({
        where: { confirmationCode },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });
      console.log(`[DELETE] User not found, marked as completed: ${facebookUserId}`);
    }

    // 8. Return status URL
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ?? request.nextUrl.origin;
    const statusUrl = `${baseUrl}/deletion-status/${confirmationCode}`;

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    });
  } catch (error) {
    console.error('[DELETE] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
