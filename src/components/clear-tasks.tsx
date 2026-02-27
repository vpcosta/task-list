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
import { Button } from "./ui/button";

export function ClearTasks() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-xs h-7 cursor-pointer">
          <Trash />
          Limpar Tarefas Concluídas
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente apagar 1 item(s)?
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
