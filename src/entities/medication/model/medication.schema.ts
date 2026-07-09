import { z } from 'zod';

export const medicationFormSchema = z
  .object({
    name: z.string().trim().min(1, '약 이름을 입력해주세요.'),
    dosageText: z.string().trim().optional(),
    mealTiming: z.enum(['before_meal', 'after_meal', 'empty_stomach', 'none']),
    startDate: z.string().min(1, '복용 시작일을 선택해주세요.'),
    endDate: z.string().optional(),
  })
  .refine(data => !data.endDate || data.endDate >= data.startDate, {
    message: '종료일은 시작일보다 빠를 수 없습니다.',
    path: ['endDate'],
  });

export type MedicationFormValues = z.infer<typeof medicationFormSchema>;
