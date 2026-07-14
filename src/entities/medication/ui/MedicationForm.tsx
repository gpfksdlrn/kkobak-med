'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: { mealTiming: 'none', ...defaultValues },
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [times, setTimes] = useState<string[]>(defaultTimes ?? ['']);
  const [timesError, setTimesError] = useState<string | null>(null);

  const addTime = () => setTimes(prev => [...prev, '']);
  const removeTime = (index: number) =>
    setTimes(prev => prev.filter((_, i) => i !== index));
  const updateTime = (index: number, value: string) =>
    setTimes(prev => prev.map((time, i) => (i === index ? value : time)));

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
      className="flex flex-col gap-3"
    >
      <div>
        <label htmlFor="name">약 이름</label>
        <input id="name" {...register('name')} />
        {errors.name && <p role="alert">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="dosageText">복용량</label>
        <input id="dosageText" {...register('dosageText')} />
      </div>

      <div>
        <label htmlFor="mealTiming">복용 시점</label>
        <select id="mealTiming" {...register('mealTiming')}>
          {MEAL_TIMING_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="startDate">시작일</label>
        <input id="startDate" type="date" {...register('startDate')} />
        {errors.startDate && <p role="alert">{errors.startDate.message}</p>}
      </div>

      <div>
        <label htmlFor="endDate">종료일 (선택)</label>
        <input id="endDate" type="date" {...register('endDate')} />
        {errors.endDate && <p role="alert">{errors.endDate.message}</p>}
      </div>

      <div>
        <span>복용 시간</span>
        {times.map((time, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="time"
              value={time}
              onChange={e => updateTime(index, e.target.value)}
            />
            {times.length > 1 && (
              <button type="button" onClick={() => removeTime(index)}>
                삭제
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addTime}>
          시간 추가
        </button>
        {timesError && <p role="alert">{timesError}</p>}
      </div>

      {submitError && <p role="alert">{submitError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </button>
    </form>
  );
}
