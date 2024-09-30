import React from "react";
import { FC } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import styles from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <BeatLoader color="#36d7b7" />
    </div>
  );
};

export default Loader;
