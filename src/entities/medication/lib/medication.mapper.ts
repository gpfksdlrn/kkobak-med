import type { MedicationFormValues } from '../model/medication.schema';
import type {
  Medication,
  MedicationInsert,
  MedicationUpdate,
} from '../model/medication.types';

export function toMedicationFormValues(
  medication: Medication
): MedicationFormValues {
  return {
    name: medication.name,
    dosageText: medication.dosage_text ?? '',
    mealTiming: (medication.meal_timing ??
      'none') as MedicationFormValues['mealTiming'],
    startDate: medication.start_date,
    endDate: medication.end_date ?? '',
  };
}

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
