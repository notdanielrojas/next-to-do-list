"use client";

import { useState } from "react";
import React from "react";
import styles from "@/app/styles/nav.module.css";
import Image from "next/image";
import { LuInbox } from "react-icons/lu";
import { IoCalendarNumberOutline, IoCalendarOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navContainer}>
      <div
        className={`${styles.hamburgerMenu} ${isOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        style={{ zIndex: isOpen ? 1 : "initial" }}
      >
        <div className={styles.hamburgerBar}></div>
        <div className={styles.hamburgerBar}></div>
        <div className={styles.hamburgerBar}></div>
      </div>
      <nav className={`${styles.navItems} ${isOpen ? styles.open : ""}`}>
        <div className={styles.navUserMenu}>
          <Image
            src='/profile.jpg'
            alt='Profile Picture'
            width={70}
            height={70}
            quality={10}
            className={styles.userAvatar}
          />
          <p>Username</p>
        </div>
        <div className={styles.addTaskContainer}>
          <Link href={"/addTask"}>
            <button className={styles.navAddTaskButton}>
              <IoIosAddCircle className={styles.menuIcon} />
              Add Task
            </button>
          </Link>
        </div>
        <Link href={"/search"} className={styles.navItem}>
          <CiSearch className={styles.menuIcon} />
          Search
        </Link>
        <Link href={"/inbox"} className={styles.navItem}>
          <LuInbox className={styles.menuIcon} />
          Inbox
        </Link>
        <Link href={"/"} className={styles.navItem}>
          <IoCalendarNumberOutline className={styles.menuIcon} />
          Today
        </Link>
        <Link href={"/upcoming"} className={styles.navItem}>
          <IoCalendarOutline className={styles.menuIcon} />
          Upcoming
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
