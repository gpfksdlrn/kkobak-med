'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Separator } from '@/shared/ui/separator';

import {
  medicationFormSchema,
  type MedicationFormValues,
} from '../model/medication.schema';

const MEAL_TIMING_OPTIONS: {
  value: MedicationFormValues['mealTiming'];
  label: string;
}[] = [
  { value: 'before_meal', label: '식전' },
  { value: 'after_meal', label: '식후' },
  { value: 'empty_stomach', label: '공복' },
  { value: 'none', label: '상관없음' },
];

const TIME_PRESETS: { label: string; value: string }[] = [
  { label: '기상직후', value: '07:00' },
  { label: '아침', value: '08:00' },
  { label: '점심', value: '12:30' },
  { label: '저녁', value: '19:00' },
  { label: '취침전', value: '22:00' },
];

function sortTimes(times: string[]) {
  return [...times].sort((a, b) => {
    if (a === '') return 1;
    if (b === '') return -1;
    return a.localeCompare(b);
  });
}

type MedicationFormProps = {
  defaultValues?: Partial<MedicationFormValues>;
  defaultTimes?: string[];
  submitLabel: string;
  resetOnSuccess?: boolean;
  onSubmit: (values: MedicationFormValues, times: string[]) => Promise<void>;
};

export function MedicationForm({
  defaultValues,
  defaultTimes,
  submitLabel,
  resetOnSuccess = false,
  onSubmit,
}: MedicationFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: { mealTiming: 'none', ...defaultValues },
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [times, setTimes] = useState<string[]>(sortTimes(defaultTimes ?? ['']));
  const [timesError, setTimesError] = useState<string | null>(null);

  const addTime = () => setTimes(prev => sortTimes([...prev, '']));
  const removeTime = (index: number) =>
    setTimes(prev => prev.filter((_, i) => i !== index));
  const updateTime = (index: number, value: string) =>
    setTimes(prev => prev.map((time, i) => (i === index ? value : time)));
  const applyPreset = (value: string) =>
    setTimes(prev => {
      const isDuplicate = prev.some(time => time.slice(0, 5) === value);
      if (isDuplicate) return prev;
      if (prev.length === 1 && prev[0] === '') return [value];
      return sortTimes([...prev, value]);
    });

  const handleFormSubmit = async (values: MedicationFormValues) => {
    const validTimes = times.filter(time => time.trim() !== '');
    if (validTimes.length === 0) {
      setTimesError('복용 시간을 하나 이상 추가해주세요.');
      return;
    }
    setTimesError(null);
    setSubmitError(null);
    try {
      await onSubmit(values, validTimes);
      if (resetOnSuccess) {
        reset();
        setTimes(['']);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : '오류가 발생했습니다.'
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">약 이름</Label>
        <Input
          id="name"
          placeholder="예: 타이레놀"
          aria-invalid={!!errors.name}
          {...register('name')}
        />
        {errors.name && (
          <p role="alert" className="text-destructive text-sm">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="dosageText">복용량</Label>
        <Input
          id="dosageText"
          placeholder="예: 1정"
          {...register('dosageText')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="mealTiming">복용 시점</Label>
        <Controller
          control={control}
          name="mealTiming"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={field.disabled}
            >
              <SelectTrigger id="mealTiming" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEAL_TIMING_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startDate">시작일</Label>
          <Input
            id="startDate"
            type="date"
            aria-invalid={!!errors.startDate}
            {...register('startDate')}
          />
          {errors.startDate && (
            <p role="alert" className="text-destructive text-sm">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="endDate">종료일 (선택)</Label>
          <Input
            id="endDate"
            type="date"
            aria-invalid={!!errors.endDate}
            {...register('endDate')}
          />
          {errors.endDate && (
            <p role="alert" className="text-destructive text-sm">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>복용 시간</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {TIME_PRESETS.map(preset => (
              <Button
                key={preset.value}
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => applyPreset(preset.value)}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-col">
            {times.map((time, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={e => updateTime(index, e.target.value)}
                    className="flex-1"
                  />
                  {times.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="시간 삭제"
                      onClick={() => removeTime(index)}
                    >
                      <X />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addTime}
            className="w-full"
          >
            <Plus data-icon="inline-start" />
            시간 추가
          </Button>

          {timesError && (
            <p role="alert" className="text-destructive text-sm">
              {timesError}
            </p>
          )}
        </CardContent>
      </Card>

      {submitError && (
        <p role="alert" className="text-destructive text-sm">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className={cn('w-full', isSubmitting && 'opacity-80')}
      >
        {isSubmitting && (
          <Loader2 data-icon="inline-start" className="animate-spin" />
        )}
        {submitLabel}
      </Button>
    </form>
  );
}
