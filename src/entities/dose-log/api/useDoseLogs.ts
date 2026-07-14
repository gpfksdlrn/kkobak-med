import { useQuery } from '@tanstack/react-query';

import { doseLogKeys, fetchDoseLogsByDate } from './dose-log.api';

export function useDoseLogs(date: string) {
  return useQuery({
    queryKey: doseLogKeys.byDate(date),
    queryFn: () => fetchDoseLogsByDate(date),
  });
}
