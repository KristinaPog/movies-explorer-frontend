import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
          <form className="search__form">
            <input className="search__input" type="text" placeholder="Фильм"></input>
            <button className="search__button" type="submit"></button>
          </form>
          <FilterCheckbox />
    </section>
  )
}

export default SearchForm;