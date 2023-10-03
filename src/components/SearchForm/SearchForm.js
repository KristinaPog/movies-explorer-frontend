import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ searchMovies, onFilter, checkboxStatus }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm({
    mode: "all",
    defaultValues: {
      search: (
        location.pathname === "/movies" ? localStorage.getItem('search-term') : '')
    }
  });

  function onSubmit(data) {
    setIsLoading(true);
    searchMovies(data.search);
    setIsLoading(false);
  }


  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="search__block">
          <input
            {...register('search', {
              required: 'Нужно ввести ключевое слово',
              minLength: 1,
            })}
            
            className="search__input"
            type="text"
            placeholder="Фильм"
            required
            disabled={isLoading}
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