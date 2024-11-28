"use client"

import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import TaskList from "../components/TaskList";
import { useFetchTasks } from "../hooks/useFetchTasks";
import styles from "../styles/search.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

export default function Search() {
  const [searchText, setSearchText] = useState<string>("");
  const { tasks, loading, error } = useFetchTasks("tasks");

  const filterTasks = (search: string, taskList: Task[]) => {
    return taskList.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTasks = filterTasks(searchText, tasks);

  return (
    <section className={styles.searchSection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Search Tasks</h2>
      </div>
      <SearchForm searchText={searchText} setSearchText={setSearchText} />
      <div className={styles.taskListContainer}>
        {error ? (
          <div className={styles.errorMessage}>{error}</div>
        ) : loading ? (
          <div className={styles.loadingStatus}>Loading tasks...</div>
        ) : (
          <TaskList tasks={filteredTasks} />
        )}
      </div>
    </section>
  );
}
