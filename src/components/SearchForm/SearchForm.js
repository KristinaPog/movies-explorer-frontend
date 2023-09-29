import React from "react";

import { useForm } from 'react-hook-form';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ searchMovies, onFilter, checkboxStatus }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "all",
  });

  function onSubmit(data) {
    searchMovies(data.search);
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="search__block">
          <input
            {...register('search', {
              required: 'Нужно ввести ключевое слово',
              minLength: 1
            })}
            className="search__input"
            type="text"
            placeholder="Фильм"
            required
          />
          
          <button className="search__button" type="submit"></button>
        
        </div>
        {errors?.search && <span className="form__input-error name-input-error">{errors?.search.message}</span>}
        <FilterCheckbox
          onFilter={onFilter}
          checkboxStatus={checkboxStatus} />
      </form>

    </section>
  )
}

export default SearchForm;