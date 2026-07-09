'use client';

import { useState } from 'react';

import { useMedications } from '@/entities/medication/api/useMedications';
import { AddMedicationForm } from '@/features/add-medication/ui/AddMedicationForm';
import { DeleteMedicationButton } from '@/features/delete-medication/ui/DeleteMedicationButton';
import { EditMedicationForm } from '@/features/edit-medication/ui/EditMedicationForm';

export function MedicationsPage() {
  const { data: medications, isLoading } = useMedications();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 p-4">
      <section>
        <h2>약 등록</h2>
        <AddMedicationForm />
      </section>

      <section>
        <h2>약 목록</h2>
        {isLoading && <p>불러오는 중...</p>}
        <ul className="flex flex-col gap-4">
          {medications?.map(medication => (
            <li key={medication.id}>
              {editingId === medication.id ? (
                <>
                  <EditMedicationForm
                    medication={medication}
                    onSuccess={() => setEditingId(null)}
                  />
                  <button type="button" onClick={() => setEditingId(null)}>
                    취소
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <p>{medication.name}</p>
                  <button
                    type="button"
                    onClick={() => setEditingId(medication.id)}
                  >
                    수정
                  </button>
                  <DeleteMedicationButton
                    medicationId={medication.id}
                    medicationName={medication.name}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
