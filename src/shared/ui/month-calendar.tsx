'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { formatDate } from '@/shared/lib/formatDate';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseDateKey(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return { year, month: month - 1, day };
}

export function MonthCalendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (date: string) => void;
}) {
  const selected = parseDateKey(value);
  const [viewYear, setViewYear] = useState(selected.year);
  const [viewMonth, setViewMonth] = useState(selected.month);

  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayKey = formatDate(new Date());

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function goToPrevMonth() {
    if (viewMonth === 0) {
      setViewYear(year => year - 1);
      setViewMonth(11);
    } else {
      setViewMonth(month => month - 1);
    }
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewYear(year => year + 1);
      setViewMonth(0);
    } else {
      setViewMonth(month => month + 1);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          aria-label="이전 달"
          onClick={goToPrevMonth}
        >
          <ChevronLeft />
        </Button>
        <span className="text-base font-semibold">
          {viewYear}년 {String(viewMonth + 1).padStart(2, '0')}월
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="다음 달"
          onClick={goToNextMonth}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="text-muted-foreground grid grid-cols-7 text-center text-xs">
        {WEEKDAYS.map(weekday => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
        {cells.map((day, index) => {
          if (day === null) {
            return <span key={`blank-${index}`} />;
          }

          const dateKey = toDateKey(viewYear, viewMonth, day);
          const isSelected = dateKey === value;
          const isToday = dateKey === todayKey;

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => onChange(dateKey)}
              className={cn(
                'mx-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors',
                !isSelected && !isToday && 'hover:bg-muted',
                isToday && !isSelected && 'text-primary border font-semibold',
                isSelected && 'bg-primary text-primary-foreground font-semibold'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
