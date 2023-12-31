function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__block">
          <p className="footer__year">&copy; 2023</p>
          <ul className="footer__navigation">
            <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
            <li className="footer__item"><a className="footer__link" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;