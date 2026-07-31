'use client';

import { LogOut } from 'lucide-react';
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
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      aria-label="로그아웃"
    >
      <LogOut data-icon="inline-start" />
      로그아웃
    </Button>
  );
}
