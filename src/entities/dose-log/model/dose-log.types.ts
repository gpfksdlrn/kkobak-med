import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '@/shared/types/supabase';

export type DoseLog = Tables<'dose_logs'>;
export type DoseLogInsert = TablesInsert<'dose_logs'>;
export type DoseLogUpdate = TablesUpdate<'dose_logs'>;
