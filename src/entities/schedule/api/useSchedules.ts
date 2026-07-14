import { useQuery } from '@tanstack/react-query';

import { fetchSchedulesByMedicationId } from './schedule.api';

export const scheduleKeys = {
  byMedication: (medicationId: string) => ['schedules', medicationId] as const,
};

export function useSchedules(medicationId: string) {
  return useQuery({
    queryKey: scheduleKeys.byMedication(medicationId),
    queryFn: () => fetchSchedulesByMedicationId(medicationId),
  });
}
