'use client';

import { useState } from 'react';

import { formatDate } from '@/shared/lib/formatDate';
import { MonthCalendar } from '@/shared/ui/month-calendar';
import { DoseHistoryList } from '@/widgets/dose-history/ui/DoseHistoryList';

export function HistoryPage() {
  const [date, setDate] = useState(() => formatDate(new Date()));

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5 p-4">
      <h1 className="text-xl font-semibold tracking-tight">복용 기록</h1>

      <MonthCalendar value={date} onChange={setDate} />

      <DoseHistoryList date={date} />
    </div>
  );
}
