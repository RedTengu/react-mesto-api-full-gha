import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm";


// Компонент попапа редактирования профиля
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {
  // Реф инпута аватара
  const avatarRef = useRef();

  // Обнуляем инпут, если попап закрыт
  useEffect(() => {
    avatarRef.current.value = "";
  }, [!isOpen]);

  // Обработчик submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 
  
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      btnText="Сохранить">
        <div className="popup__input-block">
          <input
            className="popup__text-input popup__text-input_avatar_src"
            type="url"
            id="avatar-src"
            name="avatar"
            placeholder="Ссылка на аватар"
            ref={avatarRef}
            required />
            <span className="input-error input-error-avatar-src"></span>
        </div>
      </PopupWithForm>
  );
}

export default EditAvatarPopup;