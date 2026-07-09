import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MedicationUpdate } from '../model/medication.types';
import { medicationKeys, updateMedication } from './medication.api';

export function useUpdateMedication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      medication,
    }: {
      id: string;
      medication: MedicationUpdate;
    }) => updateMedication(id, medication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
    },
  });
}
