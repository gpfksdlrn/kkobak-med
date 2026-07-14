'use client';

import { useCheckDose } from '@/entities/dose-log/api/useCheckDose';
import { useDoseLogs } from '@/entities/dose-log/api/useDoseLogs';
import { type DoseStatus,getStatus } from '@/entities/dose-log/lib/getStatus';
import { formatDate } from '@/shared/lib/formatDate';

import { useActiveMedicationsWithSchedules } from '../api/useActiveMedicationsWithSchedules';

const STATUS_LABEL: Record<DoseStatus, string> = {
  taken: '복용 완료',
  missed: '놓침',
  pending: '예정',
};

export function TodayChecklist() {
  const today = formatDate(new Date());
  const { data: medications, isLoading: isMedicationsLoading } =
    useActiveMedicationsWithSchedules(today);
  const { data: doseLogs, isLoading: isDoseLogsLoading } = useDoseLogs(today);
  const { mutate: checkDose } = useCheckDose(today);

  if (isMedicationsLoading || isDoseLogsLoading) return <p>불러오는 중...</p>;

  const items = (medications ?? [])
    .flatMap(medication =>
      (medication.schedules ?? []).map(schedule => {
        const doseLog = doseLogs?.find(log => log.schedule_id === schedule.id);

        return {
          medicationName: medication.name,
          schedule,
          status: getStatus(
            today,
            schedule.time_of_day,
            doseLog?.taken_at ?? null
          ),
        };
      })
    )
    .sort((a, b) =>
      a.schedule.time_of_day.localeCompare(b.schedule.time_of_day)
    );

  if (items.length === 0) {
    return <p>오늘 복용할 약이 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map(item => (
        <li key={item.schedule.id} className="flex items-center gap-2">
          <span>{item.schedule.time_of_day.slice(0, 5)}</span>
          <span>{item.medicationName}</span>
          <span>{STATUS_LABEL[item.status]}</span>
          {item.status !== 'taken' && (
            <button type="button" onClick={() => checkDose(item.schedule.id)}>
              복용 체크
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
