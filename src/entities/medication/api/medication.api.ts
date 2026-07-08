import { createClient } from '@/shared/api/supabase/client';

import type {
  MedicationInsert,
  MedicationUpdate,
} from '../model/medication.types';

export const medicationKeys = {
  all: ['medications'] as const,
};

export async function fetchMedications() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createMedication(medication: MedicationInsert) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('medications')
    .insert(medication)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMedication(
  id: string,
  medication: MedicationUpdate
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('medications')
    .update(medication)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMedication(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('medications').delete().eq('id', id);

  if (error) throw error;
}
