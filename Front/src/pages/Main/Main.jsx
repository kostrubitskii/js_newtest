import styles from "./main.module.scss";
import { Form } from "../../components/Form/Form";
import { HeroList } from "../../components/HeroList/HeroList";
import { Header } from "../../components/Header/Header";
import { handleCreateSubmit } from "../../components/Form/utils";
import { useState } from "react";

export const Main = () => {
  const [click, setClick] = useState(false);

  const getCLicked = () => {
    setClick((prev) => !prev);
  };

  return (
    <div>
      <Header text={"SUPERHERO BASE"} />
      <div className={styles.block}>
        <p className={styles.text}>FEATURED CHARACTERS</p>

        <div className={styles.cards}>
          <HeroList />
        </div>
        <button className={styles.button} onClick={getCLicked}>
          {click ? "CANCEL" : "ADD HERO"}
        </button>

        {click && (
          <Form buttonText={"Create Hero"} handleSubmit={handleCreateSubmit} />
        )}
      </div>
    </div>
  );
};
