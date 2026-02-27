import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function EditTask() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit
          size={16}
          className="cursor-pointer h-6 w-6 p-1 rounded-sm hover:bg-blue-100 text-blue-600"
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input placeholder="Nome da tarefa" />

          <Button className="cursor-pointer">Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
