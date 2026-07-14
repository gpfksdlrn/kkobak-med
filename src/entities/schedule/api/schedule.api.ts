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

function normalizeTime(time: string) {
  return time.slice(0, 5);
}

/**
 * 안 바뀐 시간의 schedule row는 건드리지 않고, 실제로 추가/삭제된 시간만 반영한다.
 * schedules.id는 dose_logs.schedule_id가 CASCADE로 참조하고 있어서,
 * 매번 전체 삭제 후 재생성하면 안 바뀐 시간의 복용 기록까지 함께 삭제된다.
 */
export async function replaceSchedules(medicationId: string, times: string[]) {
  const existing = await fetchSchedulesByMedicationId(medicationId);
  const newTimes = new Set(times.map(normalizeTime));
  const existingTimes = new Set(
    existing.map(s => normalizeTime(s.time_of_day))
  );

  const toDelete = existing.filter(
    s => !newTimes.has(normalizeTime(s.time_of_day))
  );
  const toInsert = times.filter(
    time => !existingTimes.has(normalizeTime(time))
  );

  const supabase = createClient();

  if (toDelete.length > 0) {
    const { error } = await supabase
      .from('schedules')
      .delete()
      .in(
        'id',
        toDelete.map(s => s.id)
      );

    if (error) throw error;
  }

  if (toInsert.length > 0) {
    await insertSchedules(
      toInsert.map(timeOfDay => ({
        medication_id: medicationId,
        time_of_day: timeOfDay,
      }))
    );
  }
}
