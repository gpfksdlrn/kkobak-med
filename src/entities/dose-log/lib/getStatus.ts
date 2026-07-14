export type DoseStatus = 'taken' | 'missed' | 'pending';

export function getStatus(
  scheduledDate: string,
  timeOfDay: string,
  takenAt: string | null,
  now: Date = new Date()
): DoseStatus {
  if (takenAt) return 'taken';

  const scheduledDateTime = new Date(`${scheduledDate}T${timeOfDay}`);
  return now > scheduledDateTime ? 'missed' : 'pending';
}
