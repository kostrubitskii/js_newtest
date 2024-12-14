/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./heropage.module.scss";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Form } from "../../components/Form/Form";
import { useDispatch } from "react-redux";
import { deleteHeroAction, updateHeroAction } from "../../actions/heroesAction";

export const HeroPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState([]);
  const [click, setClick] = useState(false);

  const fetchHero = async () => {
    try {
      const res = await fetch(`http://localhost:3005/heroes/${id}`);
      const data = await res.json();
      setHero(data);
    } catch (error) {
      console.error("Помилка завантаження героя:", error);
    }
  };

  useEffect(() => {
    fetchHero();
  }, [hero]);

  const handleUpdateHero = async (e, formData) => {
    dispatch(updateHeroAction(e, formData, id))
    fetchHero();
    setClick(false);
  };

  const getCLicked = () => {
    setClick((prev) => !prev);
  };

  const handleDelete = async () => {
    dispatch(deleteHeroAction(id, navigate))
  };

  return (
    <div>
      <Header text={"SUPERHERO INFORMATION"} />
      <div className={styles.container}>
      <a href="/" className={styles.arrow}></a>
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
        <div className={styles.buttonBlock}>
          <button className={styles.button} onClick={getCLicked}>
            {click ? "CANCEL" : "UPDATE HERO"}
          </button>

          <button className={styles.button} onClick={handleDelete}>
            DELETE HERO
          </button>
        </div>
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
              handleSubmit={handleUpdateHero}
              id={hero._id}
            />
          </div>
        )}
      </div>
    </div>
  );
};
