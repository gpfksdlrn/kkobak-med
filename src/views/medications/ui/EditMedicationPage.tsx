'use client';

import { ChevronLeft, Loader2 } from 'lucide-react';
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
    <div className="mx-auto flex max-w-md flex-col gap-6 p-4">
      <div className="flex items-center gap-2">
        <Link
          href="/medications"
          aria-label="목록으로 돌아가기"
          className="text-muted-foreground hover:text-foreground -ml-1 rounded-md p-1 transition-colors"
        >
          <ChevronLeft className="size-5" />
        </Link>
        <h1 className="text-xl font-semibold">약 수정</h1>
      </div>

      {isLoading && (
        <div className="text-muted-foreground flex items-center justify-center gap-2 py-12 text-sm">
          <Loader2 className="size-4 animate-spin" />
          불러오는 중...
        </div>
      )}
      {medication && (
        <EditMedicationForm
          medication={medication}
          onSuccess={() => router.push('/medications')}
        />
      )}
    </div>
  );
}
