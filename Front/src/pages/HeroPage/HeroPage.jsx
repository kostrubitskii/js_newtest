import styles from "./heropage.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Form } from "../../components/Form/Form";
import { handleUpdateSubmit } from "../../components/Form/utils";

export const HeroPage = () => {
  const { id } = useParams();

  const getHero = async () => {
    try {
      const res = await fetch(`http://localhost:3005/heroes/${id}`);
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const [hero, setHero] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    getHero().then((heroes) => setHero(heroes));
  }, [click]);

  const getCLicked = () => {
    setClick((prev) => !prev);
  };

  return (
    <div>
      <Header text={"SUPERHERO INFORMATION"} />
      <div className={styles.container}>
        <p className={styles.nickname}>{hero.nickname}</p>
        <p className={styles.realName}>{`(${hero.real_name})`}</p>

        <div className={styles.cathphrase}>
          <p className={styles.head}>Cath Phrase:</p>
          <p>{hero.catch_phrase}</p>
        </div>

        <div className={styles.description}>
          <p className={styles.head}>Description:</p>
          <p>{hero.origin_description}</p>
        </div>

        <div className={styles.superpowers}>
          <p className={styles.head}>Superpowers:</p>
          <p>{hero.superpowers}</p>
        </div>

        <div className={styles.imagesBlock}>
          {hero.images &&
            hero.images.map((image) => (
              <img
                className={styles.image}
                src={image}
                alt="images"
                key={image}
              />
            ))}
        </div>
        <button className={styles.button} onClick={getCLicked}>
          {click ? "CANCEL" : "UPDATE HERO"}
        </button>
        {click && (
          <div className={styles.background}>
            <Form
              buttonText={"Update Hero"}
              hero={{
                nickname: hero.nickname,
                real_name: hero.real_name,
                origin_description: hero.origin_description,
                superpowers: hero.superpowers,
                catch_phrase: hero.catch_phrase,
                images: hero.images,
              }}
              handleSubmit={handleUpdateSubmit}
              id={hero._id}
            />
          </div>
        )}
      </div>
    </div>
  );
};
