"use client";
import { addTask } from "@/actions/add-task";
import { deleteTask } from "@/actions/delete-task";
import { getTasks } from "@/actions/get-tasks-db";
import { toggleTaskStatus } from "@/actions/toggle-task";
import { updateTask } from "@/actions/update-task";
import { ClearTasks } from "@/components/clear-tasks";
import { DeleteTask } from "@/components/delete-task";
import { EditTask } from "@/components/edit-task";
import { Filter, FilterType } from "@/components/filter";
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
import { ListCheck, LoaderCircle, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

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
    setLoading(true);
    const tempTask = { id: crypto.randomUUID(), task, done: false };

    if (task.length === 0 || !task) {
      setLoading(false);
      toast.error("Insira uma tarefa!");
      return;
    }

    setTasks((prev) => [...prev, tempTask]);
    setTask("");

    try {
      const newTask = await addTask(task);

      if (!newTask) return;

      setTasks((prev) => prev.map((t) => (t.id === tempTask.id ? newTask : t)));
      setLoading(false);

      await handleGetTasks();
      setTask("");

      toast.success("Tarefa adicionada com sucesso!");

      return newTask;
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t.id !== tempTask.id));
      setLoading(false);

      console.log(err);
    }

    setLoading(false);
  }

  async function handleDeleteTask(id: string) {
    const previousTasks = tasks;

    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      if (!id) return;

      await deleteTask(id);

      toast.error("Tarefa deletada!");

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

      toast.info("Atividade atualizada!");
    } catch (err) {
      setTasks(previousTasks);
      console.error(err);
    }
  }

  async function handleToggleTask(id: string) {
    const previousTasks = [...tasks];

    try {
      setTasks((prev) => {
        const updatedTasks = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            };
          } else {
            return task;
          }
        });

        return updatedTasks;
      });

      await toggleTaskStatus(id);
    } catch (err) {
      setTasks(previousTasks);
      console.log(err);
    }
  }

  const filteredTasks = useMemo(() => {
    switch (currentFilter) {
      case "completed":
        return tasks.filter((task) => task.done);
      case "pending":
        return tasks.filter((task) => !task.done);
      default:
        return tasks;
    }
  }, [tasks, currentFilter]);

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
            {loading ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Adicionar Tarefa
          </Button>
        </CardHeader>

        <CardContent>
          <Separator />

          <Filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <div className="mt-4 border-b">
            {tasks.length === 0 && (
              <p className="text-sm text-slate-500 mt-6 mb-4">
                Sua lista de tarefas está vazia
              </p>
            )}

            {filteredTasks.map((task) => (
              <div
                className="h-12 flex hover:bg-slate-50 hover:text-slate-600 cursor-pointer justify-between items-center border-t"
                key={task.id}
              >
                <div
                  className={`${task.done ? "bg-green-400" : "bg-red-400"} w-1 h-full`}
                ></div>

                <p
                  onClick={() => handleToggleTask(task.id)}
                  className={`${task.done ? "text-slate-400  italic line-through" : ""} flex-1 px-2 text-sm`}
                >
                  {task.task}
                </p>
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
              className="h-2 rounded-md bg-rose-500"
              style={{ width: "33%" }}
            ></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
