"use client";

import React, { useState } from "react";
import { FaRegEdit, FaCheck, FaTimes } from "react-icons/fa";
import styles from "../styles/taskItem.module.css";
import { Task } from "@/types/types";

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: number) => void;
  onEdit: (taskId: number, newTitle: string, newDescription: string, newDate: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState<string>(task.date.toString());

  const handleSave = () => {
    onEdit(task.id, title, description, date);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setDate(task.date.toString());
    setIsEditing(false);
  };

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
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={styles.editInput}
              />
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={styles.editTextarea}
              />
              <input
                type="date"
                value={date.slice(0, 10)}
                onChange={e => setDate(e.target.value)}
                className={styles.editInput}
              />
            </>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </>
          )}
          <span className={styles.spamDate}>{new Date(task.date).toLocaleDateString()}</span>
        </div>
        <div className={styles.editIconContainer}>
          {isEditing ? (
            <>
              <span className={styles.editIcon} onClick={handleSave} title="Guardar">
                <FaCheck />
              </span>
              <span className={styles.editIcon} onClick={handleCancel} title="Cancelar">
                <FaTimes />
              </span>
            </>
          ) : (
            <span className={styles.editIcon} onClick={() => setIsEditing(true)} title="Editar">
              <FaRegEdit />
            </span>
          )}
        </div>
      </li>
      <hr className={styles.divider} />
    </>
  );
};

export default TaskItem;
