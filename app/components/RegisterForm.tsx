"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/register.module.css";
import { CiLogin } from "react-icons/ci";

interface RegisterFormProps {
  onSubmit: (userData: { name: string; last_name: string; email: string; password: string }) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <label htmlFor='name'>Name:</label>
      <input
        type='text'
        id='name'
        name='name'
        placeholder='Enter your name'
        required
        minLength={3}
        maxLength={20}
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className={styles.inputForm}
      />

      <label htmlFor='last_name'>Last Name:</label>
      <input
        type='text'
        id='last_name'
        name='last_name'
        placeholder='Enter your last name'
        required
        minLength={3}
        maxLength={20}
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        className={styles.inputForm}
      />

      <label htmlFor='email'>Email:</label>
      <input
        type='email'
        id='email'
        name='email'
        placeholder='Enter a valid email address'
        required
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className={styles.inputForm}
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
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className={styles.inputForm}
      />
      <button type='submit' className={styles.registerButton}>
        Sign Up <CiLogin className={styles.signInIcon} />
      </button>
      <p>Already have an account?</p>
      <p>
        <Link href='/login' style={{ textDecoration: "underline" }}>
          Sign In
        </Link>
      </p>
    </form>
  );
}
