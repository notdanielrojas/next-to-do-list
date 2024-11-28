"use client";

import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  errorMessage: string;
}

const LoginForm =({ onSubmit, errorMessage }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Enter a valid email address'
        required
        minLength={10}
        maxLength={50}
        className={styles.inputForm}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password:</label>
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Enter your password (5-20 characters)'
        required
        minLength={5}
        maxLength={20}
        className={styles.inputForm}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <button type='submit' className={styles.loginButton}>
        Sign In <CiLogin className={styles.logInIcon} />
      </button>
      <p>Don’t have an account yet?</p>
      <p>
        <Link href='/register' style={{ textDecoration: "underline" }}>
          Create Account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;