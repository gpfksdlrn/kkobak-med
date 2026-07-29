import { useQuery } from '@tanstack/react-query';

import { fetchMedicationById, medicationKeys } from './medication.api';

export function useMedication(id: string) {
  return useQuery({
    queryKey: medicationKeys.detail(id),
    queryFn: () => fetchMedicationById(id),
  });
}
