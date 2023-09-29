import React from "react";

function FilterCheckbox({ onFilter, shortMovies }) {
  return (
    <label className="checkbox" htmlFor="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        id="checkbox"
        onChange={onFilter}
        checked={shortMovies} />
      <span className="checkbox__label">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;