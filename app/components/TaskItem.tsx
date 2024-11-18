import React from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "../styles/taskItem.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <li className={styles.taskItem}>
      <div className={styles.checkboxContainer}>
        <input type='checkbox' id={`task-${task.id}`} className={styles.checkbox} />
        <label htmlFor={`task-${task.id}`} className={styles.customCheckbox}></label>
      </div>
      <div className={styles.taskInfo}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span className={styles.spamDate}>{new Date(task.date).toLocaleDateString()}</span>
      </div>
      <div className={styles.editIconContainer}>
        <span className={styles.editIcon}>
          <FaRegEdit />
        </span>
      </div>
      <hr className={styles.divider} />
    </li>
  );
};

export default TaskItem;
