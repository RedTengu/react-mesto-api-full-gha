// Компонент попапа с информацией о статусе регистрации
function InfoTooltip ({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup popup_info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__body">
        <div className="popup__status-container">
          <div className={
            isSuccess 
              ? "popup__status-img popup__status-img_success" 
              : "popup__status-img"} />
          <h2 className="popup__title popup__title_center">{
            isSuccess 
              ? 'Вы успешно зарегистрировались!' 
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h2>  
        </div>
        <button className="popup__btn-close btn hover-opacity" type="button" aria-label="Закрыть окно информации" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;