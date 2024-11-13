import React from "react";
import styles from "@/app/styles/nav.module.css";
import Image from "next/image";
import { LuInbox } from "react-icons/lu";
import { IoCalendarNumberOutline, IoCalendarOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  return (
    <>
      <div className={styles.navContainer}>
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
          <Link href={""}>
            <button className={styles.navAddTaskButton}>
              <IoIosAddCircle />
              Add Task
            </button>
          </Link>
        </div>
        <div className={styles.navItems}>
          <Link href={""} className={styles.navItem}>
            <CiSearch />
            Search
          </Link>
          <Link href={""} className={styles.navItem}>
            <LuInbox />
            Inbox
          </Link>
          <Link href={""} className={styles.navItem}>
            <IoCalendarNumberOutline />
            Today
          </Link>
          <Link href={""} className={styles.navItem}>
            <IoCalendarOutline />
            Upcoming
          </Link>
        </div>
      </div>
    </>
  );
};

export default Nav;
