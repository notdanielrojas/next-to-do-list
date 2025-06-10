import React, { useState } from "react";
import styles from "../styles/taskForm.module.css";

interface TaskFormProps {
  onAddTask: (task: { title: string; description: string; date: string }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Please fill in all fields!");
      return;
    }
    onAddTask({ title, description, date });
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskForm}>
      <div className={styles.formGroup}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder='Enter task title'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder='Enter task description'
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='date'>Due Date</label>
        <input type='date' id='date' value={date} onChange={(e) => setDate(e.target.value)} className={styles.input} />
      </div>
      <button type='submit' className={styles.addButton}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
