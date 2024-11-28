"use client";

import React from "react";
import useFetchTasks from "../hooks/useFetchTasks";
import TaskItem from "../components/TaskItem";
import styles from "../styles/page.module.css";
import useTasks from "../hooks/useTasks";

const Upcoming = () => {
  const { tasks: initialTasks, loading, error } = useFetchTasks("tasks");
  const { tasks, handleStatusChange } = useTasks(initialTasks);

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
          upcomingTasks.map((task) => <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />)
        )}
      </div>
    </section>
  );
};

export default Upcoming;
