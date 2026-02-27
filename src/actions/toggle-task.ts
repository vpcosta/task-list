"use server";
import { prisma } from "@/lib/prisma";

export async function toggleTaskStatus(idTask: string) {
  if (!idTask) return;

  const currentTask = await prisma.tasks.findUnique({
    where: { id: idTask },
  });

  if (!currentTask) return;

  try {
    const updatedTask = prisma.tasks.update({
      where: { id: idTask },
      data: { done: !currentTask.done },
    });

    if (!updatedTask) return;

    return updatedTask;
  } catch (error) {
    throw error;
  }
}
