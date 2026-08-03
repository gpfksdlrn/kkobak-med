import { useDoseLogs } from '@/entities/dose-log/api/useDoseLogs';
import { type DoseStatus, getStatus } from '@/entities/dose-log/lib/getStatus';
import { useActiveMedicationsWithSchedules } from '@/entities/medication/api/useActiveMedicationsWithSchedules';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Card } from '@/shared/ui/card';

const STATUS_LABEL: Record<DoseStatus, string> = {
  taken: '복용 완료',
  missed: '놓침',
  pending: '예정',
};

const STATUS_BADGE_CLASS: Record<DoseStatus, string> = {
  taken:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-400',
  missed: '',
  pending: '',
};

export function DoseHistoryList({ date }: { date: string }) {
  const { data: medications, isLoading: isMedicationsLoading } =
    useActiveMedicationsWithSchedules(date);
  const { data: doseLogs, isLoading: isDoseLogsLoading } = useDoseLogs(date);

  if (isMedicationsLoading || isDoseLogsLoading) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        불러오는 중...
      </p>
    );
  }

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
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        해당 날짜에 복용할 약이 없습니다.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map(item => (
        <li key={item.schedule.id}>
          <Card className="flex-row items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground w-12 shrink-0 font-mono text-sm tabular-nums">
                {item.schedule.time_of_day.slice(0, 5)}
              </span>
              <span className="text-sm font-medium">{item.medicationName}</span>
            </div>
            <Badge
              variant={item.status === 'missed' ? 'destructive' : 'secondary'}
              className={cn(
                item.status === 'pending' && 'text-muted-foreground',
                STATUS_BADGE_CLASS[item.status]
              )}
            >
              {STATUS_LABEL[item.status]}
            </Badge>
          </Card>
        </li>
      ))}
    </ul>
  );
}
