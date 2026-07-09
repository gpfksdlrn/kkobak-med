'use client';

import { useDeleteMedication } from '@/entities/medication/api/useDeleteMedication';

type DeleteMedicationButtonProps = {
  medicationId: string;
  medicationName: string;
};

export function DeleteMedicationButton({
  medicationId,
  medicationName,
}: DeleteMedicationButtonProps) {
  const { mutate, isPending, error } = useDeleteMedication();

  const handleDelete = () => {
    if (!window.confirm(`'${medicationName}'을(를) 삭제하시겠습니까?`)) return;
    mutate(medicationId);
  };

  return (
    <div>
      <button type="button" onClick={handleDelete} disabled={isPending}>
        삭제
      </button>
      {error && <p role="alert">{error.message}</p>}
    </div>
  );
}
