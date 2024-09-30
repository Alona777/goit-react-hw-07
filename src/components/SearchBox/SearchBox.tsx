import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectNameFilter);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.container}>
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search by name..."
      />
    </div>
  );
};

export default SearchBox;
