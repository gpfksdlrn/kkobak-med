'use client';

import { useRouter } from 'next/navigation';

import { createClient } from '@/shared/api/supabase/client';
import { Button } from '@/shared/ui/button';

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      로그아웃
    </Button>
  );
}
