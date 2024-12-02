import React from "react";
import styles from "../styles/searchForm.module.css";

interface SearchFormProps {
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchText, setSearchText }) => {
  return (
    <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='search'>Search for tasks:</label>
      <input
        type='text'
        id='search'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder='Search by title or description...'
        className={styles.searchInput}
      />
    </form>
  );
};

export default SearchForm;
