import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { DoseLog } from '../model/dose-log.types';
import { checkDose, doseLogKeys } from './dose-log.api';

export function useCheckDose(date: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scheduleId: string) => checkDose(scheduleId, date),
    onMutate: async scheduleId => {
      await queryClient.cancelQueries({ queryKey: doseLogKeys.byDate(date) });
      const previous = queryClient.getQueryData<DoseLog[]>(
        doseLogKeys.byDate(date)
      );
      const takenAt = new Date().toISOString();

      queryClient.setQueryData<DoseLog[]>(
        doseLogKeys.byDate(date),
        (old = []) => {
          const exists = old.some(log => log.schedule_id === scheduleId);

          if (exists) {
            return old.map(log =>
              log.schedule_id === scheduleId
                ? { ...log, taken_at: takenAt }
                : log
            );
          }

          return [
            ...old,
            {
              id: `optimistic-${scheduleId}`,
              schedule_id: scheduleId,
              scheduled_date: date,
              taken_at: takenAt,
              created_at: takenAt,
            },
          ];
        }
      );

      return { previous };
    },
    onError: (_error, _scheduleId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(doseLogKeys.byDate(date), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: doseLogKeys.byDate(date) });
    },
  });
}
