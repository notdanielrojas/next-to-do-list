"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import RegisterForm from "../components/RegisterForm";
import styles from "../styles/register.module.css";
import API_BASE_URL from "../config/apiConfig";

const Register = () => {
  const router = useRouter();

  const registerUser = async (userData: { name: string; last_name: string; email: string; password: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error creating user");
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully!",
        showConfirmButton: false,
        timer: 2000,
      });

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error trying to create the user:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div className={styles.registerSection}>
      <RegisterForm onSubmit={registerUser} />
    </div>
  );
};

export default Register;
