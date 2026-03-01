"use server";
import { prisma } from "@/lib/prisma";

export async function deleteDoneTask() {
  try {
    await prisma.tasks.deleteMany({
      where: { done: true },
    });

    const allTasks = await prisma.tasks.findMany();

    if (!allTasks) return;

    return allTasks;
  } catch (error) {
    throw error;
  }
}
