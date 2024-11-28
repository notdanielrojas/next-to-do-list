"use client";

import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import Swal from "sweetalert2";
import LoginForm from "../components/LoginForm";
import API_BASE_URL from "../config/apiConfig";
import { NextRouter } from "next/router";

const LogIn = () => {
  const router = useRouter();
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const loginRequest = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
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

    return data;
  };

  const saveLoginData = (token: string, user: object) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const redirectToProfile = (router: NextRouter) => {
    router.push("/profileValid");
  };

  const showSuccessNotification = (message: string) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleLogin = async (email: string, password: string) => {
    setErrorMessage("");

    try {
      const data = await loginRequest(email, password);

      saveLoginData(data.token, data.user);

      setUser(data.user);

      showSuccessNotification("Login Successful!");

      redirectToProfile(router);
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
};

export default LogIn;
