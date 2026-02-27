import { ClearTasks } from "@/components/clear-tasks";
import { DeleteTask } from "@/components/delete-task";
import { EditTask } from "@/components/edit-task";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { List, ListCheck, ListChecks, ListX, Plus, Trash } from "lucide-react";

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

          <div className="mt-4 border-b">
            <div className="h-12 flex justify-between items-center border-t">
              <div className="w-1 h-full bg-green-300"></div>

              <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex items-center gap-2">
                <EditTask />

                <DeleteTask />
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

            <ClearTasks />
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
