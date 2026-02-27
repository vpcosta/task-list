import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export function DeleteTask() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          size={16}
          className="cursor-pointer h-6 w-6 p-1 rounded-sm hover:bg-red-100 text-red-600"
        />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir esta tarefa?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row w-full">
          <AlertDialogAction className="flex w-1/2">Sim</AlertDialogAction>

          <AlertDialogCancel className="flex w-1/2">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
