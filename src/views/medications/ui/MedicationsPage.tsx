'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

import { useMedications } from '@/entities/medication/api/useMedications';
import { useSchedules } from '@/entities/schedule/api/useSchedules';
import { DeleteMedicationButton } from '@/features/delete-medication/ui/DeleteMedicationButton';

function MedicationTimes({ medicationId }: { medicationId: string }) {
  const { data: schedules } = useSchedules(medicationId);

  if (!schedules?.length) return null;

  return <p>{schedules.map(schedule => schedule.time_of_day).join(', ')}</p>;
}

export function MedicationsPage() {
  const { data: medications, isLoading } = useMedications();

  return (
    <div className="flex flex-col gap-6 p-4">
      <section>
        <div className="flex items-center justify-between">
          <h2>약 목록</h2>
          <Link
            href="/medications/new"
            aria-label="약 등록"
            className="flex items-center gap-1"
          >
            <Plus className="size-4" />
            약 등록
          </Link>
        </div>
        {isLoading && <p>불러오는 중...</p>}
        <ul className="flex flex-col gap-4">
          {medications?.map(medication => (
            <li key={medication.id} className="flex items-center gap-2">
              <p>{medication.name}</p>
              <MedicationTimes medicationId={medication.id} />
              <Link href={`/medications/${medication.id}/edit`}>수정</Link>
              <DeleteMedicationButton
                medicationId={medication.id}
                medicationName={medication.name}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
