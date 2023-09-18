function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="page__container about__container">
        <h2 className="section__title">О проекте</h2>
        <ul className="about__list">
          <li className="about__item">
            <h3 className="about__item-title">Дипломный проект включал 5 этапов</h3>
            <p className="about__item-subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about__item">
            <h3 className="about__item-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__item-subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="tracker">
          <div className="tracker__block tracker__block_green">
            <div className="tracker__line tracker__line_green">1 неделя</div>
            <p className="tracker__text">Back-end</p>
          </div>
          <div className="tracker__block tracker__block_gray">
            <div className="tracker__line tracker__line_gray">4 недели</div>
            <p className="tracker__text">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;