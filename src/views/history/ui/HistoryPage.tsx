'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { formatDate } from '@/shared/lib/formatDate';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { DoseHistoryList } from '@/widgets/dose-history/ui/DoseHistoryList';

function addDays(date: string, amount: number) {
  const next = new Date(`${date}T00:00:00`);
  next.setDate(next.getDate() + amount);
  return formatDate(next);
}

export function HistoryPage() {
  const [date, setDate] = useState(() => formatDate(new Date()));

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5 p-4">
      <h1 className="text-xl font-semibold tracking-tight">복용 기록</h1>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="이전 날"
          onClick={() => setDate(prev => addDays(prev, -1))}
        >
          <ChevronLeft />
        </Button>
        <Input
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          className="flex-1 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          aria-label="다음 날"
          onClick={() => setDate(prev => addDays(prev, 1))}
        >
          <ChevronRight />
        </Button>
      </div>

      <DoseHistoryList date={date} />
    </div>
  );
}
