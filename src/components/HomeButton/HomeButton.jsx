import { Link } from "react-router-dom";
import styles from "./HomeButton.module.scss";

export const HomeButton = () => {
  return (
    <Link to="/" className={styles.homeButton}>
      home
    </Link>
  );
};
