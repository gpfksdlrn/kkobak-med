import Link from 'next/link';

import { createClient } from '@/shared/api/supabase/server';
import { Button } from '@/shared/ui/button';
import { TodayChecklist } from '@/widgets/today-checklist/ui/TodayChecklist';

import { SignOutButton } from './SignOutButton';

export async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-dvh flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">꼬박약</h1>
      {user ? (
        <>
          <p className="text-muted-foreground text-sm">
            {user.email}로 로그인됨
          </p>
          <SignOutButton />
          <div className="w-full max-w-md">
            <TodayChecklist />
          </div>
        </>
      ) : (
        <>
          <p className="text-muted-foreground text-sm">로그인이 필요합니다</p>
          <Button nativeButton={false} render={<Link href="/login" />}>
            로그인하러 가기
          </Button>
        </>
      )}
    </div>
  );
}
