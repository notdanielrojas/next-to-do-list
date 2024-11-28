"use client";

import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import styles from "../styles/addTask.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

const AddTask: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.date) {
      alert("Please complete all fields.");
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      date: new Date(newTask.date).getTime(),
      status: false,
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", date: "" });
  };

  const handleStatusChange = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: !task.status } : task)));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add New Task</h1>
      <div className={styles.form}>
        <input
          type='text'
          placeholder='Task Title'
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className={styles.input}
        />
        <textarea
          placeholder='Task Description'
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className={styles.textarea}
        />
        <input
          type='date'
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          className={styles.input}
        />
        <button onClick={handleAddTask} className={styles.addButton}>
          Add Task
        </button>
      </div>
      <div className={styles.taskItemContainer}>
        {tasks.length === 0 ? (
          <div className={styles.taskMessage}>No tasks available.</div>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />)
        )}
      </div>
    </div>
  );
};

export default AddTask;
