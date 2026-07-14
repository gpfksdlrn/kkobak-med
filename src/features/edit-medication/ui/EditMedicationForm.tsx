'use client';

import { useUpdateMedication } from '@/entities/medication/api/useUpdateMedication';
import {
  toMedicationFormValues,
  toMedicationUpdate,
} from '@/entities/medication/lib/medication.mapper';
import type { MedicationFormValues } from '@/entities/medication/model/medication.schema';
import type { Medication } from '@/entities/medication/model/medication.types';
import { MedicationForm } from '@/entities/medication/ui/MedicationForm';
import { useSchedules } from '@/entities/schedule/api/useSchedules';

type EditMedicationFormProps = {
  medication: Medication;
  onSuccess?: () => void;
};

export function EditMedicationForm({
  medication,
  onSuccess,
}: EditMedicationFormProps) {
  const { mutateAsync } = useUpdateMedication();
  const { data: schedules, isLoading } = useSchedules(medication.id);

  const handleSubmit = async (
    values: MedicationFormValues,
    times: string[]
  ) => {
    await mutateAsync({
      id: medication.id,
      medication: toMedicationUpdate(values),
      times,
    });
    onSuccess?.();
  };

  if (isLoading) return <p>불러오는 중...</p>;

  return (
    <MedicationForm
      defaultValues={toMedicationFormValues(medication)}
      defaultTimes={schedules?.map(schedule => schedule.time_of_day)}
      submitLabel="수정"
      onSubmit={handleSubmit}
    />
  );
}
