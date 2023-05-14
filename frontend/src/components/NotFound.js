import { Link } from "react-router-dom"

import lapenko from "../images/Lapenko.gif"

function NotFound () {
  return (
    <main className="not-found">
      <img className="not-found__img" src={lapenko} alt="Жилин" />
      <p className="not-found__text">Вы зашли не в то Место, голубчик, охохо-ох-хо!</p>
      <Link className="not-found__button" to="/">Понял, ухожу💔!</Link>
    </main>
  );
}

export default NotFound;