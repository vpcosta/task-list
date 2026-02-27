import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  List,
  ListCheck,
  ListChecks,
  ListX,
  Plus,
  Trash,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-rose-50">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input placeholder="Criar nova tarefa" />
          <Button variant="default" className="cursor-pointer">
            <Plus />
            Adicionar Tarefa
          </Button>
        </CardHeader>

        <CardContent>
          <Separator />

          <div className="mt-5 flex gap-2">
            <Badge variant="default" className="cursor-pointer">
              <List />
              Todas
            </Badge>

            <Badge variant="outline" className="cursor-pointer">
              <ListChecks />
              Concluídas
            </Badge>

            <Badge variant="outline" className="cursor-pointer">
              <ListX />
              Não Concluídas
            </Badge>
          </div>

          <div className="mt-4 border-b-1">
            <div className="h-12 flex justify-between items-center border-t-1">
              <div className="w-1 h-full bg-green-300"></div>

              <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Edit
                      size={16}
                      className="cursor-pointer h-6 w-6 p-1 rounded-sm hover:bg-blue-100 text-blue-600"
                    />
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>Editar Tarefa</DialogHeader>

                    <div className="flex gap-2">
                      <Input placeholder="Nome da tarefa" />

                      <Button className="cursor-pointer">Salvar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Trash
                  size={16}
                  className="cursor-pointer h-6 w-6 p-1 rounded-sm hover:bg-red-100 text-red-600"
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <ListCheck size={14} />
              <p className="text-sm">Tarefas concluídas (3/3)</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-xs h-7 cursor-pointer"
                >
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
                  <AlertDialogAction className="flex w-1/2">
                    Sim
                  </AlertDialogAction>

                  <AlertDialogCancel className="flex w-1/2">
                    Cancelar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="mt-4 mb-2 w-full h-2 rounded-md bg-gray-200">
            <div
              className="h-2 rounded-md bg-blue-500"
              style={{ width: "33%" }}
            ></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
