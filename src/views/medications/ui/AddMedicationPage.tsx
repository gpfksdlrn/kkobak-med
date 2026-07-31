'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AddMedicationForm } from '@/features/add-medication/ui/AddMedicationForm';

export function AddMedicationPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 p-4">
      <div className="flex items-center gap-2">
        <Link
          href="/medications"
          aria-label="목록으로 돌아가기"
          className="text-muted-foreground hover:text-foreground -ml-1 rounded-md p-1 transition-colors"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-xl font-semibold">약 등록</h1>
      </div>

      <AddMedicationForm onSuccess={() => router.push('/medications')} />
    </div>
  );
}
