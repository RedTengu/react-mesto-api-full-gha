import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

// Компонент карточки
function Card({ card, onCardClick, onCardLike, onConfirm }) {
  // Подписка на контекст пользователя
  const currentUser = useContext(CurrentUserContext);

  // Проверка владения карточкой
  const isOwn = card.owner === currentUser._id;

  // Проверка лайка текущего пользователя
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Делаем лайк активным исходя из проверки
  const cardLikeButtonClassName = ( 
    `card__like-btn btn ${isLiked && 'card__like-btn_active'}` 
  );

  // Обработчик лайка карточки
  const handleLikeClick = () => {
    onCardLike(card, isLiked);
  }

  // Обработчик отправки данных карточки на удаление
  const handleDeleteClick = () => {
    onConfirm(card);
  }

  // Функция подставляет значения карты в попап картинки
  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <li className="gallery__card-item">
      <article className="card">
        <img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
        <div className="card__info">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-info">
            <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button>
            <p className="card__like-count">{card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button className="card__delete-btn btn hover-opacity" type="button" aria-label="Удалить карточку" onClick={handleDeleteClick} />}
      </article>
    </li>
  );
}

export default Card;