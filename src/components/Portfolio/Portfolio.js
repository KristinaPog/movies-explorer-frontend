import arrow from "../../images/arrow.svg"

function Portfolio() {
  return (
    <section className="section portfolio">
      <div className="page__container portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <a href="https://kristinapog.github.io/how-to-learn/" target="_blank" rel="noopener noreferrer" className="portfolio__link">Статичный сайт</a>
            <img src={arrow} className="portfolio__image" alt="Стрелка"/>
          </li>
          <li className="portfolio__item">
            <a href="https://kristinapog.github.io/russian-travel/index.html" target="_blank" rel="noopener noreferrer" className="portfolio__link">Адаптивный сайт</a>
            <img src={arrow} className="portfolio__image" alt="Стрелка"/>
          </li>
          <li className="portfolio__item">
            <a href="https://pogodina.nomoreparties.co" target="_blank" rel="noopener noreferrer" className="portfolio__link">Одностраничное приложение</a>
            <img src={arrow} className="portfolio__image" alt="Стрелка"/>
          </li>
        </ul>
      </div>

    </section>
  )
}

export default Portfolio;