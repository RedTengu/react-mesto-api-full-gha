// Компонент попапов с формой
function PopupWithForm({ name, isOpen, title, children, btnText, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__body">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" action="POST" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__submit-input popup__submit-input_active" type="submit">{btnText}</button>
        </form>
        <button className="popup__btn-close btn hover-opacity" type="button" aria-label="Закрыть окно редактирования" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;