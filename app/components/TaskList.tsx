"use client";

import React from "react";
import TaskItem from "./TaskItem";
import styles from "../styles/taskList.module.css";
import { Task } from "@/types/types";
import useTasks from "../hooks/useTasks";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const { tasks: handledTasks, handleStatusChange, handleEdit } = useTasks(tasks);

  return (
    <div className={styles.taskContainer}>
      {handledTasks.length === 0 ? (
        <div>No tasks match your search.</div>
      ) : (
        handledTasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} onEdit={handleEdit} />
        ))
      )}
    </div>
  );
};

export default TaskList;
