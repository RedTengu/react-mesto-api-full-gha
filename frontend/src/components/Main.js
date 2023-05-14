import { useContext } from "react";

import Card from "./Card";

import CurrentUserContext from "../contexts/CurrentUserContext";

// Компонент Main
function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onConfirm }) {

  // Подписка на котекст пользователя
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/>
        </div>
        <div className="profile__info">
          <div className="profile__nickname-wrapper">
            <h1 className="profile__nickname">{currentUser.name}</h1>
            <button className="profile__edit-btn btn hover-opacity" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>
          <p className="profile__bio">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn btn hover-opacity" type="button" aria-label="Добавить карточку" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__cards">
          {cards.map(card => {
            return <Card 
                      key={card._id} 
                      card={card} 
                      onCardClick={onCardClick} 
                      onCardLike={onCardLike} 
                      onConfirm={onConfirm} />
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;