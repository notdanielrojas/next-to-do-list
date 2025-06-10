import { useState } from "react";
import { Task } from "@/types/types";

const useTasks = (initialTasks: Task[]) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusChange = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: !task.status } : task)));
  };

  const handleEdit = (taskId: number, newTitle: string, newDescription: string, newDate: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: newTitle, description: newDescription, date: Number(newDate) }
          : task
      )
    );
  };

  return { tasks, handleStatusChange, handleEdit };
};

export default useTasks;
