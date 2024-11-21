"use client";

import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Swal from "sweetalert2";
import LoginForm from "../components/LoginForm";

export default function LogIn() {
  const router = useRouter();
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setErrorMessage("");

    try {
      const response = await fetch("https://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email or password incorrect");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful!",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/profileValid");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.loginSection}>
      <LoginForm onSubmit={handleLogin} errorMessage={errorMessage} />
    </div>
  );
}
