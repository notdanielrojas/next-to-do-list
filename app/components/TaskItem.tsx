import React from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "../styles/taskItem.module.css";
import { Task } from "@/types/types";
interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  return (
    <>
      <li className={styles.taskItem}>
        <div className={styles.checkboxContainer}>
          <input
            type='checkbox'
            id={`task-${task.id}`}
            className={styles.checkbox}
            checked={task.status}
            onChange={() => onStatusChange(task.id)}
          />
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
      </li>
      <hr className={styles.divider} />
    </>
  );
};


export default TaskItem;
