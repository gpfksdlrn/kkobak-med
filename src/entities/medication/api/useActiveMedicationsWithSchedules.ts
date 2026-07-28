import { useQuery } from '@tanstack/react-query';

import {
  fetchActiveMedicationsWithSchedules,
  medicationKeys,
} from './medication.api';

export function useActiveMedicationsWithSchedules(date: string) {
  return useQuery({
    queryKey: medicationKeys.activeWithSchedules(date),
    queryFn: () => fetchActiveMedicationsWithSchedules(date),
  });
}
