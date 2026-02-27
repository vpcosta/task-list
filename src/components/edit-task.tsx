"use client";
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
import { useState } from "react";

type EditTaskProps = {
  id: string;
  currentName: string;
  onConfirmEdit: (id: string, newName: string) => void;
};

export function EditTask({ id, currentName, onConfirmEdit }: EditTaskProps) {
  const [name, setName] = useState(currentName ?? "");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome da tarefa"
          />

          <Button
            onClick={() => {
              onConfirmEdit(id, name);
              setOpen(false);
            }}
            className="cursor-pointer"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
