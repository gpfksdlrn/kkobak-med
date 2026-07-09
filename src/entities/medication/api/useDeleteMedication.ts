import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMedication, medicationKeys } from './medication.api';

export function useDeleteMedication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicationKeys.all });
    },
  });
}
