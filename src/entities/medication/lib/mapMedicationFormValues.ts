import type { MedicationFormValues } from '../model/medication.schema';
import type {
  MedicationInsert,
  MedicationUpdate,
} from '../model/medication.types';

export function toMedicationInsert(
  values: MedicationFormValues
): Omit<MedicationInsert, 'user_id'> {
  return {
    name: values.name,
    dosage_text: values.dosageText || null,
    meal_timing: values.mealTiming,
    start_date: values.startDate,
    end_date: values.endDate || null,
  };
}

export function toMedicationUpdate(
  values: MedicationFormValues
): MedicationUpdate {
  return toMedicationInsert(values);
}
