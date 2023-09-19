import me from "../../images/me.jpg";

function AboutMe() {
  return (
    <section className="section about-me" id="about-me">
      <div className="page__container about-me__container">
        <h2 className="section__title">Студент</h2>
        <div className="about-me__block">
          <div className="about-me__info">
            <h3 className="about-me__name">Кристина</h3>
            <p className="about-me__about">Фронтенд-разработчик, 31 год</p>
            <p className="about-me__text">Привет, меня зовут Кристина. Я&nbsp;из&nbsp;Нижнего Новгорода и&nbsp;я&nbsp;обожаю верстать. В&nbsp;2014 году я&nbsp;закончила ННГУ им. Козьмы Минина по&nbsp;специальности &laquo;Информационные системы и&nbsp;технологии&raquo;. Но&nbsp;в&nbsp;то&nbsp;время так и&nbsp;не&nbsp;начала работать по&nbsp;специальности. А&nbsp;год назад увлеклась вёрсткой, что побудило меня начать обучение на&nbsp;Frontend&nbsp;&mdash; разработчика.</p>
            <a href="https://github.com/KristinaPog" className="about-me__link" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
          <img src={me} className="about-me__photo" alt="Погодина Кристина - фронтенд разработчик" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe;