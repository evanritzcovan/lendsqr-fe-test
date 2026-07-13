import { NextResponse } from 'next/server';
import { MAX_PAGE_SIZE, STATUS_FILTER_FETCH_LIMIT } from '@/lib/constants';
import { getAllUsers } from '@/lib/users-data';
import {
  parseUsersQueryParams,
  queryUsers,
} from '@/lib/users-query';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = parseUsersQueryParams(searchParams);
    const maxLimit =
      (params.limit ?? 0) > MAX_PAGE_SIZE
        ? STATUS_FILTER_FETCH_LIMIT
        : MAX_PAGE_SIZE;
    const result = queryUsers(getAllUsers(), params, { maxLimit });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}
