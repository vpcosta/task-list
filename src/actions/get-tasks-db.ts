"use server";
import { prisma } from "@/lib/prisma";

export async function getTasks() {
  try {
    const tasks = await prisma.tasks.findMany();

    if (!tasks) return;

    return tasks;
  } catch (error) {
    throw error;
  }
}
