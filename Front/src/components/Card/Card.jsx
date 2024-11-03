import { Link } from "react-router-dom";
import styles from "./card.module.scss";
import { React } from "react";

export const Card = ({ h }) => {
  return (
    <Link to={`/heroes/${h._id}`} className={styles.card} key={h._id}>
      <div className={styles.imageBlock}>
        <img src={h.images[0]} alt="spider" className={styles.image} />
      </div>

      <div className={styles.cardContent}>
        <h1 className={styles.text}>{h.nickname}</h1>
      </div>
    </Link>
  );
};
