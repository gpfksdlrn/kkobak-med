import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createMedication, medicationKeys } from './medication.api';

export function useCreateMedication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
    },
  });
}
