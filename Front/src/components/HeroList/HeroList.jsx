import { Card } from "../Card/Card";
import styles from "./herolist.module.scss";
import { useEffect, useState } from "react";

export const HeroList = () => {
  const getHero = async () => {
    try {
      const res = await fetch("http://localhost:3005/heroes");
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const [hero, setHero] = useState([]);

  useEffect(() => {
    getHero().then((heroes) => setHero(heroes));
  }, []);

  return (
      <div className={styles.wrapper}>
        {hero.map((hero) => (
          <Card h={hero} key={hero._id} />
      ))}
      </div>
  );
};
