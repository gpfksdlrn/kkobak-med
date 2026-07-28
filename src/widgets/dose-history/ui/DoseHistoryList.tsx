import { useDoseLogs } from '@/entities/dose-log/api/useDoseLogs';
import { type DoseStatus, getStatus } from '@/entities/dose-log/lib/getStatus';
import { useActiveMedicationsWithSchedules } from '@/entities/medication/api/useActiveMedicationsWithSchedules';

const STATUS_LABEL: Record<DoseStatus, string> = {
  taken: '복용 완료',
  missed: '놓침',
  pending: '예정',
};

export function DoseHistoryList({ date }: { date: string }) {
  const { data: medications, isLoading: isMedicationsLoading } =
    useActiveMedicationsWithSchedules(date);
  const { data: doseLogs, isLoading: isDoseLogsLoading } = useDoseLogs(date);

  if (isMedicationsLoading || isDoseLogsLoading) return <p>불러오는 중...</p>;

  const items = (medications ?? [])
    .flatMap(medication =>
      (medication.schedules ?? []).map(schedule => {
        const doseLog = doseLogs?.find(log => log.schedule_id === schedule.id);

        return {
          medicationName: medication.name,
          schedule,
          status: getStatus(
            date,
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
    return <p>해당 날짜에 복용할 약이 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map(item => (
        <li key={item.schedule.id} className="flex items-center gap-2">
          <span>{item.schedule.time_of_day.slice(0, 5)}</span>
          <span>{item.medicationName}</span>
          <span>{STATUS_LABEL[item.status]}</span>
        </li>
      ))}
    </ul>
  );
}
