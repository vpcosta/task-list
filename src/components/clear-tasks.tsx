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

interface ClearTasksProps {
  totalTasks: number;
  onDeleteDoneTasks: () => void;
}
export function ClearTasks({ totalTasks, onDeleteDoneTasks }: ClearTasksProps) {
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
            Deseja realmente apagar {totalTasks} item(s)?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row w-full">
          <AlertDialogAction
            className="flex w-1/2 cursor-pointer"
            onClick={onDeleteDoneTasks}
          >
            Sim
          </AlertDialogAction>

          <AlertDialogCancel className="flex w-1/2 cursor-pointer">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
