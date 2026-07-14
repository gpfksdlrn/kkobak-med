import { createClient } from '@/shared/api/supabase/client';

export const doseLogKeys = {
  byDate: (date: string) => ['dose-logs', date] as const,
};

export async function fetchDoseLogsByDate(date: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('dose_logs')
    .select('*')
    .eq('scheduled_date', date);

  if (error) throw error;
  return data;
}

export async function checkDose(scheduleId: string, scheduledDate: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('dose_logs')
    .upsert(
      {
        schedule_id: scheduleId,
        scheduled_date: scheduledDate,
        taken_at: new Date().toISOString(),
      },
      { onConflict: 'schedule_id,scheduled_date' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
