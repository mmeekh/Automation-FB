import { NextResponse } from 'next/server';
import { fetchSettingsOverview } from '@/lib/api';

export async function GET() {
  const data = await fetchSettingsOverview();
  return NextResponse.json(data);
}
