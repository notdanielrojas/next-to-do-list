"use client";

import React from "react";
import useFetchTasks from "../hooks/useFetchTasks";
import useTasks from "../hooks/useTasks";
import TaskItem from "../components/TaskItem";
import styles from "../styles/page.module.css";

const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const Inbox = () => {
  const { tasks: initialTasks, loading, error } = useFetchTasks("tasks");
  const { tasks, handleStatusChange } = useTasks(initialTasks);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  const todayString = getTodayString();
  const pendingTasks = tasks.filter((task) => !task.status && task.date && String(task.date).startsWith(todayString));

  return (
    <section className={styles.taskSection}>
      <h2>Inbox</h2>
      <div className={styles.taskContainer}>
        {pendingTasks.length === 0 ? (
          <div>No pending tasks.</div>
        ) : (
          pendingTasks.map((task) => <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />)
        )}
      </div>
    </section>
  );
};

export default Inbox;
