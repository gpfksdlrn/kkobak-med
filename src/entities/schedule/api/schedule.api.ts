import { createClient } from '@/shared/api/supabase/client';

import type { ScheduleInsert } from '../model/schedule.types';

export async function fetchSchedulesByMedicationId(medicationId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('medication_id', medicationId)
    .order('time_of_day', { ascending: true });

  if (error) throw error;
  return data;
}

export async function insertSchedules(schedules: ScheduleInsert[]) {
  if (schedules.length === 0) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from('schedules')
    .insert(schedules)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteSchedulesByMedicationId(medicationId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('medication_id', medicationId);

  if (error) throw error;
}
