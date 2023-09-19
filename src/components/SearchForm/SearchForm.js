import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__block">
          <input className="search__input" type="text" placeholder="Фильм" required></input>
          <button className="search__button" type="submit"></button>
        </div>
        <FilterCheckbox />
      </form>

    </section>
  )
}

export default SearchForm;