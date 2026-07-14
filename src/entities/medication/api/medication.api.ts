import {
  deleteSchedulesByMedicationId,
  insertSchedules,
} from '@/entities/schedule/api/schedule.api';
import { createClient } from '@/shared/api/supabase/client';

import type {
  MedicationInsert,
  MedicationUpdate,
} from '../model/medication.types';

export const medicationKeys = {
  all: ['medications'] as const,
};

function toScheduleInserts(medicationId: string, times: string[]) {
  return times.map(timeOfDay => ({
    medication_id: medicationId,
    time_of_day: timeOfDay,
  }));
}

export async function fetchMedications() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createMedication(
  medication: Omit<MedicationInsert, 'user_id'>,
  times: string[]
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const { data, error } = await supabase
    .from('medications')
    .insert({ ...medication, user_id: user.id })
    .select()
    .single();

  if (error) throw error;

  try {
    await insertSchedules(toScheduleInserts(data.id, times));
  } catch (scheduleError) {
    await supabase.from('medications').delete().eq('id', data.id);
    throw scheduleError;
  }

  return data;
}

export async function updateMedication(
  id: string,
  medication: MedicationUpdate,
  times: string[]
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('medications')
    .update(medication)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  await deleteSchedulesByMedicationId(id);
  await insertSchedules(toScheduleInserts(id, times));

  return data;
}

export async function deleteMedication(id: string) {
  await deleteSchedulesByMedicationId(id);

  const supabase = createClient();
  const { error } = await supabase.from('medications').delete().eq('id', id);

  if (error) throw error;
}
