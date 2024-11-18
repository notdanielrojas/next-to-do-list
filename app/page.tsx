"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/page.module.css";
import { FaRegEdit } from "react-icons/fa";
import { useUser } from "../context/UserContext";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

const ITEMS_PER_PAGE = 10;

export default function Today() {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) {
        console.error("User is not logged in.");
        return;
      }

      try {
        const response = await fetch(`https://localhost:3000/tasks/${user.id}`, {
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
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(startIndex, endIndex);

  return (
    <section className={styles.todaySection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Today</h2>
      </div>
      {error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <>
          <div className={styles.taskItemContainer}>
            {currentTasks.length === 0 ? (
              <div>No tasks found.</div>
            ) : (
              currentTasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <div className={styles.checkboxContainer}>
                    <input type='checkbox' id={`task-${task.id}`} className={styles.checkbox} />
                    <label htmlFor={`task-${task.id}`} className={styles.customCheckbox}></label>
                  </div>
                  <div className={styles.taskInfo}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className={styles.spamDate}>{new Date(task.date).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.editIconContainer}>
                    <span className={styles.editIcon}>
                      <FaRegEdit />
                    </span>
                  </div>
                  <hr className={styles.divider} />
                </li>
              ))
            )}
          </div>
          <div className={styles.pagination}>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
