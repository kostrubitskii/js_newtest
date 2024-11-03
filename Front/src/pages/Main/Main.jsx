import styles from "./main.module.scss";
import { Form } from "../../components/Form/Form";
import { HeroList } from "../../components/HeroList/HeroList";
import { Header } from "../../components/Header/Header";
import { handleCreateSubmit } from "../../components/Form/utils";

export const Main = () => {
  return (
    <div>
      <Header text={'SUPERHERO BASE'}/>
      <div className={styles.block}>
        <p className={styles.text}>FEATURED CHARACTERS</p>

        <div className={styles.cards}>
          <HeroList />
        </div>
        <p className={styles.text}>ADD HERO</p>
        <Form buttonText={'Create Hero'} handleSubmit={handleCreateSubmit}/>
      </div>
    </div>
  );
};
