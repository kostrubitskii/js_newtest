/* eslint-disable no-unused-vars */
import { Card } from "../Card/Card";
import styles from "./herolist.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";

export const HeroList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const heroesPerPage = 5;

  const heroes = useSelector((state) => state.heroes.heroes);

  const lastHeroIndex = currentPage * heroesPerPage;
  const firstHeroIndex = lastHeroIndex - heroesPerPage;
  const currentHeroes = heroes.slice(firstHeroIndex, lastHeroIndex);

  const totalPages = Math.ceil(heroes.length / heroesPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {currentHeroes.map((hero) => (
          <Card h={hero} key={hero._id} />
        ))}
      </div>

        <div className={styles.pagination}>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          ))}
      </div>
    </div>
  );
};
