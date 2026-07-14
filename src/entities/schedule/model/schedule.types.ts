import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@/shared/types/supabase';

export type Schedule = Tables<'schedules'>;
export type ScheduleInsert = TablesInsert<'schedules'>;
export type ScheduleUpdate = TablesUpdate<'schedules'>;
