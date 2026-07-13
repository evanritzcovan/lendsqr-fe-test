import { Suspense } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { UserDetailsView } from '@/components/user-details';

interface UserDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<Spinner fullPage label="Loading user details" />}>
      <UserDetailsView userId={id} />
    </Suspense>
  );
}
