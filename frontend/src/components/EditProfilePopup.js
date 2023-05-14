import { useState, useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm";

import CurrentUserContext from "../contexts/CurrentUserContext";

// Компонент попапа редактирования профиля
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст пользователя
  const currentUser = useContext(CurrentUserContext);
  
  // Стейты имени и описания
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]); 

  // Обработчики привязки полей к стейту
  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeAbout = (e) => {
    setAbout(e.target.value)
  }

  // Обработчик submit профиля
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name,
      about
    });
  }
  
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="profile"
      title="Редактировать профиль"
      btnText="Сохранить">
        <div className="popup__input-block">
          <input
            className="popup__text-input popup__text-input_profile_name"
            type="text"
            id="profile-name"
            name="name"
            minLength="2"
            maxLength="40"
            placeholder="Никнейм"
            value={name || ''}
            onChange={handleChangeName}
            required />
          <span className="input-error input-error-profile-name"></span>
        </div>
        <div className="popup__input-block">
          <input
            className="popup__text-input popup__text-input_profile_job"
            type="text"
            id="profile-job"
            name="about"
            minLength="2"
            maxLength="200"
            placeholder="Деятельность"
            value={about || ''}
            onChange={handleChangeAbout}
            required />
          <span className="input-error input-error-profile-job"></span>
        </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;