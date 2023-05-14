import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";


// Компонент попапа редактирования профиля
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Обработчики привязки полей к стейту
  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeLink = (e) => {
    setLink(e.target.value)
  }

  // Обнуляем инпут, если попап закрыт
  useEffect(() => {
    setName('')
    setLink('') 
  }, [!isOpen]);

  // Обработчик submit
  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name,
      link
    })
  } 
  
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="card-add"
      title="Новое место"
      btnText="Создать">
        <div className="popup__input-block">
          <input
            className="popup__text-input popup__text-input_card_name"
            type="text"
            id="card-name"
            name="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={name || ''}
            onChange={handleChangeName}
            required />
          <span className="input-error input-error-card-name"></span>
        </div>
        <div className="popup__input-block">
          <input
            className="popup__text-input popup__text-input_card_src"
            type="url"
            id="card-src"
            name="link"
            placeholder="Ссылка на картинку"
            value={link || ''}
            onChange={handleChangeLink}
            required />
          <span className="input-error input-error-card-src"></span>
        </div>                
    </PopupWithForm>
  );
}

export default AddPlacePopup;