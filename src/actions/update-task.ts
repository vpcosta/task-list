"use server";
import { prisma } from "@/lib/prisma";

export async function updateTask(idTask: string, newTask: string) {
  if (!idTask) return;

  try {
    const updatedTask = await prisma.tasks.update({
      where: { id: idTask },
      data: { task: newTask },
    });

    if (!updatedTask) return;

    return updatedTask;
  } catch (error) {
    throw error;
  }
}
