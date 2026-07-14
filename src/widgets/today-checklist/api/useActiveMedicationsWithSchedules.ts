import { useQuery } from '@tanstack/react-query';

import { fetchActiveMedicationsWithSchedules } from './todayChecklist.api';

export const todayChecklistKeys = {
  byDate: (date: string) => ['today-checklist', date] as const,
};

export function useActiveMedicationsWithSchedules(date: string) {
  return useQuery({
    queryKey: todayChecklistKeys.byDate(date),
    queryFn: () => fetchActiveMedicationsWithSchedules(date),
  });
}
