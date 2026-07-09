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
  submitLabel: string;
  resetOnSuccess?: boolean;
  onSubmit: (values: MedicationFormValues) => Promise<void>;
};

export function MedicationForm({
  defaultValues,
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

  const handleFormSubmit = async (values: MedicationFormValues) => {
    setSubmitError(null);
    try {
      await onSubmit(values);
      if (resetOnSuccess) reset();
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

      {submitError && <p role="alert">{submitError}</p>}

      <button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </button>
    </form>
  );
}
