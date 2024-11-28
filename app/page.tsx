import React from "react";
import { useFetchTasks } from "./hooks/useFetchTasks";
import TaskItem from "./components/TaskItem";
import styles from "../styles/page.module.css";
import { useTasks } from "./hooks/useTasks";

export default function Home() {
  const { tasks: initialTasks, loading, error } = useFetchTasks("tasks");
  const { tasks, handleStatusChange } = useTasks(initialTasks);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <section className={styles.taskSection}>
      <h2>Home</h2>
      <div className={styles.taskContainer}>
        {tasks.length === 0 ? (
          <div>No tasks available.</div>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />)
        )}
      </div>
    </section>
  );
}
