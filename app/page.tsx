import styles from "./styles/today.module.css";

export default function Home() {
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
        </li>
        <hr className={styles.divider} />
      </div>
    </section>
  );
}
