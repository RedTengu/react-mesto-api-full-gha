import PopupWithForm from "./PopupWithForm";


// Компонент попапа редактирования профиля
function ConfirmPopup({ isOpen, onClose, card, onCardDelete }) {


  // Обработчик submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    onCardDelete(card);
  } 
  
  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="confirm"
      title="Вы уверены?"
      btnText="Да" />
  );
}

export default ConfirmPopup;