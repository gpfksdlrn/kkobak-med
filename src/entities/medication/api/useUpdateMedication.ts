import { useMutation, useQueryClient } from '@tanstack/react-query';

import { scheduleKeys } from '@/entities/schedule/api/useSchedules';

import type { MedicationUpdate } from '../model/medication.types';
import { medicationKeys, updateMedication } from './medication.api';

export function useUpdateMedication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      medication,
      times,
    }: {
      id: string;
      medication: MedicationUpdate;
      times: string[];
    }) => updateMedication(id, medication, times),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
      queryClient.invalidateQueries({
        queryKey: scheduleKeys.byMedication(variables.id),
      });
    },
  });
}
