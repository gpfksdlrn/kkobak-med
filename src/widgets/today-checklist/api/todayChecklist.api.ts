import { createClient } from '@/shared/api/supabase/client';

export async function fetchActiveMedicationsWithSchedules(date: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('medications')
    .select('*, schedules(*)')
    .lte('start_date', date)
    .or(`end_date.is.null,end_date.gte.${date}`);

  if (error) throw error;
  return data;
}
