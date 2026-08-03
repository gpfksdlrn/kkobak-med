'use client';

import { Trash2 } from 'lucide-react';

import { useDeleteMedication } from '@/entities/medication/api/useDeleteMedication';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/alert-dialog';
import { Button } from '@/shared/ui/button';

type DeleteMedicationButtonProps = {
  medicationId: string;
  medicationName: string;
};

export function DeleteMedicationButton({
  medicationId,
  medicationName,
}: DeleteMedicationButtonProps) {
  const { mutate, isPending, error } = useDeleteMedication();

  const handleDelete = () => {
    mutate(medicationId);
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`${medicationName} 삭제`}
            />
          }
        >
          <Trash2 />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>약 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              &apos;{medicationName}&apos;을(를) 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={handleDelete}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {error && (
        <p role="alert" className="text-destructive mt-1 text-xs">
          {error.message}
        </p>
      )}
    </div>
  );
}
