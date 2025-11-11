import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export const runtime = 'nodejs';

type RouteParams = {
  params: {
    code: string;
  };
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const confirmationCode = params.code;

    if (!confirmationCode) {
      return NextResponse.json({ error: 'Confirmation code is required' }, { status: 400 });
    }

    const deletionRequest = await prisma.deletionRequest.findUnique({
      where: { confirmationCode },
    });

    if (!deletionRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({
      confirmation_code: deletionRequest.confirmationCode,
      status: deletionRequest.status.toLowerCase(),
      requestedAt: deletionRequest.requestedAt,
      completedAt: deletionRequest.completedAt,
    });
  } catch (error) {
    console.error('Deletion status lookup failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

