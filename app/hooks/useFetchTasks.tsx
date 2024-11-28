import { useState, useEffect } from "react";
import API_BASE_URL from "../config/apiConfig";
import { useUser } from "../../context/UserContext";
import { Task } from "@/types/types";

export const useFetchTasks = (endpoint: string) => {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!endpoint || !user) return;

    const controller = new AbortController();
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (e) {
        if (e instanceof Error) {
          if (e.name !== "AbortError") {
            setError(e.message);
          }
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      controller.abort();
    };
  }, [endpoint, user]);

  return { tasks, loading, error };
};
