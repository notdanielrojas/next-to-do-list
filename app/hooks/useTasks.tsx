import { useState } from "react";
import { Task } from "@/types/types";

export const useTasks = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusChange = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: !task.status } : task)));
  };

  return { tasks, handleStatusChange };
};
