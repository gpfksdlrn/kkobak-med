import { EditMedicationPage } from '@/views/medications/ui/EditMedicationPage';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditMedicationPage medicationId={id} />;
}
