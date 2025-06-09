"use client";

import React, { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import styles from "../styles/page.module.css";
import useTasks from "../hooks/useTasks";
import type { Task } from "../../types/types";

const Upcoming = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Error fetching tasks");
        const data: Task[] = await res.json();
        setTasks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const { tasks: managedTasks, handleStatusChange } = useTasks(tasks);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  const upcomingTasks = managedTasks.filter((task) => task.date > Date.now());

  return (
    <section className={styles.taskSection}>
      <h2>Upcoming</h2>
      <div className={styles.taskContainer}>
        {upcomingTasks.length === 0 ? (
          <div>No upcoming tasks.</div>
        ) : (
          upcomingTasks.map((task) => (
            <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} />
          ))
        )}
      </div>
    </section>
  );
};

export default Upcoming;
