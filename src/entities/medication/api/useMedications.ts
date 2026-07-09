import { useQuery } from '@tanstack/react-query';

import { fetchMedications, medicationKeys } from './medication.api';

export function useMedications() {
  return useQuery({
    queryKey: medicationKeys.all,
    queryFn: fetchMedications,
  });
}
