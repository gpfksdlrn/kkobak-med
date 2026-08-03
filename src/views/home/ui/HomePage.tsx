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
    <div className="mx-auto flex h-full w-full max-w-md flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">꼬박약</h1>
        {user && <SignOutButton />}
      </header>

      {user ? (
        <>
          <p className="text-muted-foreground -mt-4 text-sm">
            {user.email}로 로그인됨
          </p>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-medium">오늘의 복약</h2>
            <TodayChecklist />
          </section>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground text-sm">로그인이 필요합니다</p>
          <Button nativeButton={false} render={<Link href="/login" />}>
            로그인하러 가기
          </Button>
        </div>
      )}
    </div>
  );
}
