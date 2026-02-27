"use client";
import { addTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { getTasks } from "@/actions/get-tasks-db";
import { updateTask } from "@/actions/update-task";
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
import { Tasks } from "@/generated/prisma/client";
import { List, ListCheck, ListChecks, ListX, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [task, setTask] = useState("");

  async function handleGetTasks() {
    try {
      const tasks = await getTasks();

      if (!tasks) return;

      setTasks(tasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddTask() {
    const tempTask = { id: crypto.randomUUID(), task, done: false };

    if (!task) return;

    setTasks((prev) => [...prev, tempTask]);
    setTask("");

    try {
      const newTask = await addTask(task);

      if (!newTask) return;

      setTasks((prev) => prev.map((t) => (t.id === tempTask.id ? newTask : t)));

      await handleGetTasks();
      setTask("");

      return newTask;
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t.id !== tempTask.id));
      console.log(err);
    }
  }

  async function handleDeleteTask(id: string) {
    const previousTasks = tasks;

    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      if (!id) return;

      await deleteTask(id);

      await handleGetTasks();
    } catch (err) {
      setTasks(previousTasks);
      console.log(err);
    }
  }

  async function handleUpdateTask(id: string, newName: string) {
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, task: newName } : t)),
    );

    try {
      await updateTask(id, newName);
    } catch (err) {
      setTasks(previousTasks);
      console.error(err);
    }
  }

  useEffect(() => {
    async function fetchTasks() {
      await handleGetTasks();
    }

    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-rose-50">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            value={task}
            placeholder="Criar nova tarefa"
            onChange={(e) => setTask(e.target.value)}
            required
          />
          <Button
            onClick={handleAddTask}
            variant="default"
            className="cursor-pointer"
          >
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
            {tasks.map((task) => (
              <div
                className="h-12 flex justify-between items-center border-t"
                key={task.id}
              >
                <div className="w-1 h-full bg-red-300"></div>

                <p className="flex-1 px-2 text-sm">{task.task}</p>
                <div className="flex items-center gap-2">
                  <EditTask
                    id={task.id}
                    currentName={task.task}
                    onConfirmEdit={handleUpdateTask}
                  />

                  <DeleteTask
                    task={task.task}
                    id={task.id}
                    onConfirmDelete={handleDeleteTask}
                  />
                </div>
              </div>
            ))}
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
