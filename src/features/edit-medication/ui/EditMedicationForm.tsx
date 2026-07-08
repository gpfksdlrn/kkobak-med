'use client';

import { useUpdateMedication } from '@/entities/medication/api/useUpdateMedication';
import {
  toMedicationFormValues,
  toMedicationUpdate,
} from '@/entities/medication/lib/medication.mapper';
import type { MedicationFormValues } from '@/entities/medication/model/medication.schema';
import type { Medication } from '@/entities/medication/model/medication.types';
import { MedicationForm } from '@/entities/medication/ui/MedicationForm';

type EditMedicationFormProps = {
  medication: Medication;
};

export function EditMedicationForm({ medication }: EditMedicationFormProps) {
  const { mutateAsync } = useUpdateMedication();

  const handleSubmit = async (values: MedicationFormValues) => {
    await mutateAsync({
      id: medication.id,
      medication: toMedicationUpdate(values),
    });
  };

  return (
    <MedicationForm
      defaultValues={toMedicationFormValues(medication)}
      submitLabel="수정"
      onSubmit={handleSubmit}
    />
  );
}
