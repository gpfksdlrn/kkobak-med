'use client';

import { Pencil, Pill, Plus } from 'lucide-react';
import Link from 'next/link';

import { useMedications } from '@/entities/medication/api/useMedications';
import { useSchedules } from '@/entities/schedule/api/useSchedules';
import { DeleteMedicationButton } from '@/features/delete-medication/ui/DeleteMedicationButton';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

function MedicationTimes({ medicationId }: { medicationId: string }) {
  const { data: schedules } = useSchedules(medicationId);

  if (!schedules?.length) {
    return (
      <p className="text-muted-foreground text-xs">등록된 복용 시간 없음</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {schedules.map(schedule => (
        <Badge key={schedule.id} variant="secondary">
          {schedule.time_of_day}
        </Badge>
      ))}
    </div>
  );
}

export function MedicationsPage() {
  const { data: medications, isLoading } = useMedications();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 p-4">
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">약 목록</h1>
          <Button
            nativeButton={false}
            render={<Link href="/medications/new" aria-label="약 등록" />}
            size="sm"
          >
            <Plus className="size-4" />약 등록
          </Button>
        </div>

        {isLoading && (
          <p className="text-muted-foreground py-8 text-center text-sm">
            불러오는 중...
          </p>
        )}

        {!isLoading && medications?.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                <Pill className="text-muted-foreground size-5" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">등록된 약이 없습니다</p>
                <p className="text-muted-foreground text-sm">
                  복용 중인 약을 등록하고 복약 알림을 받아보세요
                </p>
              </div>
              <Button
                nativeButton={false}
                render={<Link href="/medications/new" />}
                size="sm"
              >
                <Plus className="size-4" />약 등록하기
              </Button>
            </CardContent>
          </Card>
        )}

        {!isLoading && medications && medications.length > 0 && (
          <ul className="flex flex-col gap-3">
            {medications.map(medication => (
              <li key={medication.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle>{medication.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        <Button
                          nativeButton={false}
                          render={
                            <Link
                              href={`/medications/${medication.id}/edit`}
                              aria-label={`${medication.name} 수정`}
                            />
                          }
                          variant="ghost"
                          size="icon-sm"
                        >
                          <Pencil />
                        </Button>
                        <DeleteMedicationButton
                          medicationId={medication.id}
                          medicationName={medication.name}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MedicationTimes medicationId={medication.id} />
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
