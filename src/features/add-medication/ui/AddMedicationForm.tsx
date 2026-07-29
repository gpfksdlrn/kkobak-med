'use client';

import { useCreateMedication } from '@/entities/medication/api/useCreateMedication';
import { toMedicationInsert } from '@/entities/medication/lib/medication.mapper';
import type { MedicationFormValues } from '@/entities/medication/model/medication.schema';
import { MedicationForm } from '@/entities/medication/ui/MedicationForm';

type AddMedicationFormProps = {
  onSuccess?: () => void;
};

export function AddMedicationForm({ onSuccess }: AddMedicationFormProps) {
  const { mutateAsync } = useCreateMedication();

  const handleSubmit = async (
    values: MedicationFormValues,
    times: string[]
  ) => {
    await mutateAsync({ medication: toMedicationInsert(values), times });
    onSuccess?.();
  };

  return <MedicationForm submitLabel="등록" onSubmit={handleSubmit} />;
}
