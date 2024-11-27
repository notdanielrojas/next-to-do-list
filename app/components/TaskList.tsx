import React from "react";
import TaskItem from "./TaskItem";
import styles from "../styles/taskList.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className={styles.taskContainer}>
      {tasks.length === 0 ? (
        <div>No tasks match your search.</div>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
