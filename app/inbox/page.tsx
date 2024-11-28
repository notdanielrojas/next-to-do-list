"use client";

import React from "react";
import { useFetchTasks } from "../hooks/useFetchTasks";
import TaskItem from "../components/TaskItem";
import styles from "../styles/page.module.css";

export default function Inbox() {
  const { tasks, loading, error } = useFetchTasks("tasks");

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  const pendingTasks = tasks.filter((task) => !task.status);

  return (
    <section className={styles.taskSection}>
      <h2>Inbox</h2>
      <div className={styles.taskContainer}>
        {pendingTasks.length === 0 ? (
          <div>No pending tasks.</div>
        ) : (
          pendingTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}
