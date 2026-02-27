"use server";

import { prisma } from "@/lib/prisma";

export async function addTask(task: string) {
  if (!task) return;

  try {
    const newTask = await prisma.tasks.create({
      data: { task: task, done: false },
    });

    if (!newTask) return;

    return newTask;
  } catch (error) {
    throw error;
  }
}
