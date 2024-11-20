import styles from "./main.module.scss";
import { Form } from "../../components/Form/Form";
import { HeroList } from "../../components/HeroList/HeroList";
import { Header } from "../../components/Header/Header";
import { handleCreateSubmit } from "../../components/Form/utils";
import { useEffect, useState } from "react";

export const Main = () => {
  const [click, setClick] = useState(false);
  const [heroes, setHeroes] = useState([]);

  const fetchHeroes = async () => {
    try {
      const res = await fetch("http://localhost:3005/heroes");
      const data = await res.json();
      setHeroes(data);
    } catch (error) {
      console.error("Помилка завантаження героїв:", error);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleCreateHero = async (e, formData) => {
    await handleCreateSubmit(e, formData);
    await fetchHeroes();
    setClick(false);
  };

  const getCLicked = () => {
    setClick((prev) => !prev);
  };

  return (
    <div>
      <Header text={"SUPERHERO BASE"} />
      <div className={styles.block}>
        <p className={styles.text}>FEATURED CHARACTERS</p>

        <div className={styles.cards}>
          <HeroList heroes={heroes} />
        </div>
        <button className={styles.button} onClick={getCLicked}>
          {click ? "CANCEL" : "ADD HERO"}
        </button>

        {click && (
          <Form buttonText={"Create Hero"} handleSubmit={handleCreateHero} />
        )}
      </div>
    </div>
  );
};
