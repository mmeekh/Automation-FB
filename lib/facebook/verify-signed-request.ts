import crypto from 'crypto';

export interface FacebookSignedRequestPayload {
  algorithm?: string;
  issued_at?: number;
  user_id?: string;
  [key: string]: unknown;
}

const base64UrlToBuffer = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = normalized.length % 4;
  const padded = normalized + (padLength ? '='.repeat(4 - padLength) : '');
  return Buffer.from(padded, 'base64');
};

export const verifySignedRequest = (signedRequest: string): FacebookSignedRequestPayload => {
  if (!signedRequest) {
    throw new Error('Missing signed_request parameter');
  }

  const appSecret = process.env.FACEBOOK_APP_SECRET;
  if (!appSecret) {
    throw new Error('FACEBOOK_APP_SECRET is not configured');
  }

  const [encodedSignature, encodedPayload] = signedRequest.split('.');
  if (!encodedSignature || !encodedPayload) {
    throw new Error('Invalid signed_request format');
  }

  const payloadBuffer = base64UrlToBuffer(encodedPayload);

  const expectedSignature = crypto.createHmac('sha256', appSecret).update(encodedPayload).digest();
  const providedSignature = base64UrlToBuffer(encodedSignature);

  if (
    expectedSignature.length !== providedSignature.length ||
    !crypto.timingSafeEqual(expectedSignature, providedSignature)
  ) {
    throw new Error('Invalid signed_request signature');
  }

  const payloadText = payloadBuffer.toString('utf-8');
  let payload: FacebookSignedRequestPayload;

  try {
    payload = JSON.parse(payloadText);
  } catch (error) {
    throw new Error('Unable to parse signed_request payload');
  }

  if (payload.algorithm !== 'HMAC-SHA256') {
    throw new Error(`Unexpected signed_request algorithm: ${payload.algorithm}`);
  }

  if (!payload.user_id) {
    throw new Error('signed_request payload missing user_id');
  }

  return payload;
};

export default verifySignedRequest;
