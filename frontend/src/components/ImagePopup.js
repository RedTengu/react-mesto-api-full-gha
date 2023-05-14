// Компонент попапа карточки
function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_gallery ${isOpen ? "popup_opened" : ""}`}>
      <figure className="popup__figure">
        <img className="popup__img" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button className="popup__btn-close btn hover-opacity" type="button" aria-label="Закрыть окно просмотра" onClick={onClose}></button>
      </figure>
    </div>
  );
}

export default ImagePopup;