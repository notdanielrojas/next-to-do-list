"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles/today.module.css";
import { FaRegEdit } from "react-icons/fa";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  description: string;
  date: number;
  status: boolean;
}

export default function Today() {
  const { user, setUser } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
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

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div className={styles.loadingStatus}>Loading your tasks...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setUser(null);
    router.push("/login");
  };

  return (
    <section className={styles.todaySection}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Today</h2>
      </div>
      <div className={styles.taskItemContainer}>
        <li className={styles.taskItem}>
          <div className={styles.checkboxContainer}>
            <input type='checkbox' id='task1' className={styles.checkbox} />
            <label htmlFor='task1' className={styles.customCheckbox}></label>
          </div>
          <div className={styles.taskInfo}>
            <h3>This a mocking title</h3>
            <p>This is a mocking description</p>
            <span className={styles.spamDate}>this is a mocking date</span>
          </div>
          <div className={styles.editIconContainer}>
            <span className={styles.editIcon}>
              <FaRegEdit />
            </span>
          </div>
        </li>
        <hr className={styles.divider} />
      </div>
    </section>
  );
}
