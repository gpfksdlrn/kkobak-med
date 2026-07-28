'use client';

import { useState } from 'react';

import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui/button';
import { DoseHistoryList } from '@/widgets/dose-history/ui/DoseHistoryList';

function addDays(date: string, amount: number) {
  const next = new Date(`${date}T00:00:00`);
  next.setDate(next.getDate() + amount);
  return formatDate(next);
}

export function HistoryPage() {
  const [date, setDate] = useState(() => formatDate(new Date()));

  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-xl font-semibold">복용 기록</h1>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setDate(prev => addDays(prev, -1))}
        >
          이전 날
        </Button>
        <input
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          className="rounded border px-2 py-1"
        />
        <Button
          variant="outline"
          onClick={() => setDate(prev => addDays(prev, 1))}
        >
          다음 날
        </Button>
      </div>

      <DoseHistoryList date={date} />
    </div>
  );
}
