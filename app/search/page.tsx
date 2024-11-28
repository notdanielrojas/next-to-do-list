"use client";

import React, { useState, useMemo } from "react";
import SearchForm from "../components/SearchForm";
import TaskList from "../components/TaskList";
import { useFetchTasks } from "../hooks/useFetchTasks";
import styles from "../styles/search.module.css";

export default function Search() {
  const [searchText, setSearchText] = useState<string>("");
  const { tasks, loading, error } = useFetchTasks("tasks");

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, tasks]);

  const noTasksMessage = filteredTasks.length === 0 && !loading && !error;

  return (
    <section className={styles.searchSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Search Tasks</h2>
      </div>
      <SearchForm searchText={searchText} setSearchText={setSearchText} />
      <div className={styles.taskListContainer}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {loading ? (
          <div className={styles.loadingStatus}>Loading tasks...</div>
        ) : noTasksMessage ? (
          <div className={styles.noTasksMessage}>No tasks found</div>
        ) : (
          <TaskList tasks={filteredTasks} />
        )}
      </div>
    </section>
  );
}
