import { NextResponse } from 'next/server';
import { fetchAnalyticsOverview } from '@/lib/api';

export async function GET() {
  const data = await fetchAnalyticsOverview();
  return NextResponse.json(data);
}
