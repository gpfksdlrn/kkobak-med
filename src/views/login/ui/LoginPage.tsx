'use client';

import { createClient } from '@/shared/api/supabase/client';
import { Button } from '@/shared/ui/button';

export function LoginPage() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-2xl font-semibold">꼬박약</h1>
      <p className="text-muted-foreground text-sm">
        복약 관리를 시작하려면 로그인하세요
      </p>
      <Button onClick={handleGoogleLogin}>Google로 로그인</Button>
    </div>
  );
}
