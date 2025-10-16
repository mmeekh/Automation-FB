import { NextResponse } from 'next/server';
import { fetchAutomationsOverview } from '@/lib/api';

export async function GET() {
  const data = await fetchAutomationsOverview();
  return NextResponse.json(data);
}
