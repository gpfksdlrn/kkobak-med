import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@/shared/types/supabase';

export type Medication = Tables<'medications'>;
export type MedicationInsert = TablesInsert<'medications'>;
export type MedicationUpdate = TablesUpdate<'medications'>;

export type MealTiming =
  'before_meal' | 'after_meal' | 'empty_stomach' | 'none';
