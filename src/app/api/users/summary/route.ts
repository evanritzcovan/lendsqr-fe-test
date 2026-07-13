import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/users-data';
import { getUsersSummary } from '@/lib/users-query';

export async function GET() {
  try {
    const summary = getUsersSummary(getAllUsers());
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch users summary' },
      { status: 500 },
    );
  }
}
