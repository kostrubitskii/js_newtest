import styles from "./header.module.scss";

export const Header = ({ text }) => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};
