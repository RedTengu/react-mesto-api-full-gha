import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound"
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Main from "./Main"
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";

import Api from "../utils/api";
import authApi from "../utils/authApi";

// Компонент приложения
function App() {
  // Стейты попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  
  // Стейт бургера
  const [isBurgerClick, setIsBurgerClick] = useState(false);
  
  // Стейт карточек
  const [cards, setCards] = useState([]);
  // Стейт карты для попапа картинки
  const [selectedCard, setSelectedCard] = useState({});
  // Стейт карты на удаление
  const [cardForDelete, setCardForDelete] = useState({});

  // Стейт текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт email
  const [headerEmail, setHeaderEmail] = useState('');

  // Стейт успешной регистрации
  const [isSuccess, setIsSuccess] = useState(false);

  // Стейт статуса пользователя
  const [loggedIn, setLoggedIn] = useState(false);

  // Хук навигации
  const navigate = useNavigate();

  // Инициализация экземпляра Api
  const api = new Api({
    url: 'https://api.tengu.nomoredomains.monster',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  // Проверка токена при монтировании
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authApi.checkToken(token)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setHeaderEmail(res.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // Получаем данные карт и пользователя с сервера, если залогинен
  useEffect(() => {
    loggedIn &&
      Promise.all([api.getProfileInfo(), api.getCardsData()])
        .then(([user, cards]) => {
          setCurrentUser(user);

          setCards(cards.reverse());
      })
        .catch(err => console.log(err));
  }, [loggedIn]);

  // Если модалка открыта повесить обработчики закрытия по оверлею и клавише
  useEffect(() => {
    if (isEditProfilePopupOpen 
        || isAddPlacePopupOpen 
        || isEditAvatarPopupOpen 
        || isConfirmPopupOpen 
        || isCardPopupOpen
        || isInfoTooltipOpen) {
      document.addEventListener('keydown', handleEscClose);
      document.addEventListener('mousedown', handleOverlayClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', handleOverlayClose);
    };
  }, [isEditProfilePopupOpen, 
      isAddPlacePopupOpen, 
      isEditAvatarPopupOpen, 
      isConfirmPopupOpen, 
      isCardPopupOpen,
      isInfoTooltipOpen]);


  // Функции изменения стейтов попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);

    setIsCardPopupOpen(!isCardPopupOpen);
  }

  const handleConfirmClick = (cardData) => {
    setCardForDelete(cardData);

    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  }

  // Изменение стейта бургера
  const handleBurgerClick = () => {
    setIsBurgerClick(!isBurgerClick);
  }

  // Функция регистрации
  const handleRegister = (email, password) => {
    authApi.register(email, password)
      .then(res => {
        setIsSuccess(true);

        setIsInfoTooltipOpen(true);
      })
      .then(() => {
        navigate("/sign-in", {replace: true});
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  // Функция входа
  const handleLogin = (email, password) => {
    authApi.authorization(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);

          setHeaderEmail(email);

          localStorage.setItem('token', res.token);
          navigate("/", {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  // Функция выхода
  const handleLogout = () => {
    setLoggedIn(false);
    setHeaderEmail("");
    localStorage.removeItem('token');
  }

  // Функция лайка и дизлайка карточки
  const handleCardLike = (card, isLiked) => {
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
  }

  // Функция удаления карточки
  const handleCardDelete = (card) => {
    api.deleteThisCard(card._id)
    .then(() => {
      setCards(state => state.filter(c => c._id !== card._id));

      closeAllPopups();
    })
    .catch(err => console.log(err));
  }

  // Закрытие всех попапов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

   // Закрытие попапа по клавише Esc
   const handleEscClose = (e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  // Закрытие попапа кликом по оверлею
  const handleOverlayClose = (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  // Апдейт данных пользователя
  const handleUpdateUser = ({name, about}) => {
    api.patchProfileInfo({name, about})
      .then(() => {
        setCurrentUser({...currentUser, name, about});

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // Апдейт аватара
  const handleUpdateAvatar = ({ avatar }) => {
    api.patchAvatar({ avatar })
      .then(() => {
        setCurrentUser({...currentUser, avatar});

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // Создание карточки
  const handleAddPlaceSubmit = (cardData) => {
    api.postNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Header 
          headerEmail={headerEmail} 
          isBurgerClick={isBurgerClick}
          onBurgerClick={handleBurgerClick}
          onLogout={handleLogout} />
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} /> 
          <Route path="/" element={
            <ProtectedRoute 
              loggedIn={loggedIn} 
              element={Main}
              onEditAvatar={handleEditAvatarClick} 
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick}
              onConfirm={handleConfirmClick}
              cards={cards}
              onCardClick={handleCardClick} 
              onCardLike={handleCardLike}
            />} 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> 

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} />
        
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit} />

        <ConfirmPopup 
          isOpen={isConfirmPopupOpen} 
          onClose={closeAllPopups}
          card={cardForDelete} 
          onCardDelete={handleCardDelete} />

        <ImagePopup 
          card={selectedCard} 
          isOpen={isCardPopupOpen} 
          onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
