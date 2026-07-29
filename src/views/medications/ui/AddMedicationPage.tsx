'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AddMedicationForm } from '@/features/add-medication/ui/AddMedicationForm';

export function AddMedicationPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-2">
        <Link href="/medications" aria-label="목록으로 돌아가기">
          <ChevronLeft className="size-5" />
        </Link>
        <h2>약 등록</h2>
      </div>

      <AddMedicationForm onSuccess={() => router.push('/medications')} />
    </div>
  );
}
