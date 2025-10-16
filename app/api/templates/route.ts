import { NextResponse } from 'next/server';
import { fetchTemplatesLibrary } from '@/lib/api';

export async function GET() {
  const data = await fetchTemplatesLibrary();
  return NextResponse.json(data);
}
