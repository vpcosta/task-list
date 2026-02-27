"use server";
import { prisma } from "@/lib/prisma";

export async function deleteTask(idTask: string) {
  if (!idTask) return;

  try {
    const deletedTask = await prisma.tasks.delete({
      where: { id: idTask },
    });

    if (!deletedTask) return;

    return deletedTask;
  } catch (error) {
    throw error;
  }
}
