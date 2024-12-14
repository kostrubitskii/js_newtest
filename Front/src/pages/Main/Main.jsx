/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./main.module.scss";
import { Form } from "../../components/Form/Form";
import { HeroList } from "../../components/HeroList/HeroList";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addHeroAction, fetchHeroesAction } from "../../actions/heroesAction";

export const Main = () => {
  const [click, setClick] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroesAction());
  }, []);

  const handleCreateHero = async (e, formData) => {
    
    await dispatch(addHeroAction(e, formData));

    dispatch(fetchHeroesAction());
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
          <HeroList />
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
