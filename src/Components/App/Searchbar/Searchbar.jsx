import React from "react";
import propTypes from "prop-types";
import { SearchbarStyles, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";

const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarStyles className="searchbar">
      <SearchForm className="form" onSubmit={onSubmit}>
        <SearchFormButton type="submit" className="button" name="button">
          <span className="button-label">Search</span>
        </SearchFormButton>
        <SearchFormInput
          className="input"
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyles>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func,
}

export default Searchbar;
