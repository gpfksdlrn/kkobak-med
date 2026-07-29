'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useMedication } from '@/entities/medication/api/useMedication';
import { EditMedicationForm } from '@/features/edit-medication/ui/EditMedicationForm';

type EditMedicationPageProps = {
  medicationId: string;
};

export function EditMedicationPage({ medicationId }: EditMedicationPageProps) {
  const router = useRouter();
  const { data: medication, isLoading } = useMedication(medicationId);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-2">
        <Link href="/medications" aria-label="목록으로 돌아가기">
          <ChevronLeft className="size-5" />
        </Link>
        <h2>약 수정</h2>
      </div>

      {isLoading && <p>불러오는 중...</p>}
      {medication && (
        <EditMedicationForm
          medication={medication}
          onSuccess={() => router.push('/medications')}
        />
      )}
    </div>
  );
}
