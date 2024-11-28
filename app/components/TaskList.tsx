import React from "react";
import TaskItem from "./TaskItem";
import styles from "../styles/taskList.module.css";
import { Task } from "@/types/types";
import { useTasks } from "../hooks/useTasks";

interface TaskListProps {
  initialTasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
  const { tasks, handleStatusChange } = useTasks(initialTasks);

  return (
    <div className={styles.taskContainer}>
      {tasks.length === 0 ? (
        <div>No tasks match your search.</div>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
        ))
      )}
    </div>
  );
};

export default TaskList;
