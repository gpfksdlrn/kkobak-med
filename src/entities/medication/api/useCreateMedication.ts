import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MedicationInsert } from '../model/medication.types';
import { createMedication, medicationKeys } from './medication.api';

export function useCreateMedication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      medication,
      times,
    }: {
      medication: Omit<MedicationInsert, 'user_id'>;
      times: string[];
    }) => createMedication(medication, times),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
    },
  });
}
