"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import TaskList from "../components/TaskList";
import styles from "../styles/search.module.css";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

export default function Search() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`https://localhost:3000/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data: Task[] = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = (search: string, taskList: Task[]) => {
    return taskList.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(filterTasks(searchText, tasks));
  }, [searchText, tasks]);

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
