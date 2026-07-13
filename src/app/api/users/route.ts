import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/users-data';
import {
  parseUsersQueryParams,
  queryUsers,
} from '@/lib/users-query';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = parseUsersQueryParams(searchParams);
    const result = queryUsers(getAllUsers(), params);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}
