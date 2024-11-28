"use client";

import React from "react";
import { useFetchTasks } from "../hooks/useFetchTasks";
import TaskItem from "../components/TaskItem";
import styles from "../styles/page.module.css";

export default function Upcoming() {
  const { tasks, loading, error } = useFetchTasks("tasks");

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  const upcomingTasks = tasks.filter((task) => new Date(task.date).getTime() > Date.now());

  return (
    <section className={styles.taskSection}>
      <h2>Upcoming</h2>
      <div className={styles.taskContainer}>
        {upcomingTasks.length === 0 ? (
          <div>No upcoming tasks.</div>
        ) : (
          upcomingTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </section>
  );
}
