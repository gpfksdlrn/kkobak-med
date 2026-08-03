'use client';

import { CheckCircle2, CircleDashed, Pill, XCircle } from 'lucide-react';

import { useCheckDose } from '@/entities/dose-log/api/useCheckDose';
import { useDoseLogs } from '@/entities/dose-log/api/useDoseLogs';
import { type DoseStatus, getStatus } from '@/entities/dose-log/lib/getStatus';
import { useActiveMedicationsWithSchedules } from '@/entities/medication/api/useActiveMedicationsWithSchedules';
import { formatDate } from '@/shared/lib/formatDate';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';

const STATUS_LABEL: Record<DoseStatus, string> = {
  taken: '복용 완료',
  missed: '놓침',
  pending: '예정',
};

const STATUS_ICON: Record<DoseStatus, typeof CheckCircle2> = {
  taken: CheckCircle2,
  missed: XCircle,
  pending: CircleDashed,
};

const STATUS_ICON_STYLE: Record<DoseStatus, string> = {
  taken:
    'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  missed: 'bg-destructive/10 text-destructive',
  pending: 'bg-muted text-muted-foreground',
};

const STATUS_BADGE_STYLE: Record<DoseStatus, string> = {
  taken:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  missed: 'bg-destructive/10 text-destructive',
  pending: 'bg-muted text-muted-foreground',
};

export function TodayChecklist() {
  const today = formatDate(new Date());
  const { data: medications, isLoading: isMedicationsLoading } =
    useActiveMedicationsWithSchedules(today);
  const { data: doseLogs, isLoading: isDoseLogsLoading } = useDoseLogs(today);
  const { mutate: checkDose, isPending: isChecking } = useCheckDose(today);

  if (isMedicationsLoading || isDoseLogsLoading) {
    return (
      <Card>
        <CardContent className="text-muted-foreground flex items-center justify-center py-10 text-sm">
          불러오는 중...
        </CardContent>
      </Card>
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
    return (
      <Card>
        <CardContent className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-sm">
          <Pill className="text-muted-foreground/60 size-6" />
          오늘 복용할 약이 없습니다.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card size="sm" className="p-0">
      <CardContent className="px-0">
        <ul className="divide-border divide-y">
          {items.map(item => {
            const Icon = STATUS_ICON[item.status];

            return (
              <li
                key={item.schedule.id}
                className="flex items-center gap-3 px-4 py-3"
              >
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full',
                    STATUS_ICON_STYLE[item.status]
                  )}
                >
                  <Icon className="size-4.5" aria-hidden />
                </span>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">
                    {item.medicationName}
                  </span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {item.schedule.time_of_day.slice(0, 5)}
                  </span>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    'border-transparent',
                    STATUS_BADGE_STYLE[item.status]
                  )}
                >
                  {STATUS_LABEL[item.status]}
                </Badge>

                {item.status !== 'taken' && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isChecking}
                    onClick={() => checkDose(item.schedule.id)}
                  >
                    체크
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
