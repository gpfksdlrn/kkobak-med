'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCreateMedication } from '@/entities/medication/api/useCreateMedication';
import { toMedicationInsert } from '@/entities/medication/lib/mapMedicationFormValues';
import {
  medicationFormSchema,
  type MedicationFormValues,
} from '@/entities/medication/model/medication.schema';

const MEAL_TIMING_OPTIONS: {
  value: MedicationFormValues['mealTiming'];
  label: string;
}[] = [
  { value: 'before_meal', label: '식전' },
  { value: 'after_meal', label: '식후' },
  { value: 'empty_stomach', label: '공복' },
  { value: 'none', label: '상관없음' },
];

export function AddMedicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicationFormValues>({
    resolver: zodResolver(medicationFormSchema),
    defaultValues: { mealTiming: 'none' },
  });
  const { mutateAsync } = useCreateMedication();

  const onSubmit = async (values: MedicationFormValues) => {
    await mutateAsync(toMedicationInsert(values));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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

      <button type="submit" disabled={isSubmitting}>
        등록
      </button>
    </form>
  );
}
