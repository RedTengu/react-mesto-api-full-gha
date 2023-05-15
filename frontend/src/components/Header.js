import { Routes, Route, Link, useNavigate } from "react-router-dom";

import logo from "../images/header-logo.svg"

// Компонент Header
function Header({ headerEmail, isBurgerClick, onBurgerClick, onLogout }) {
  
  return (
    <>
      {isBurgerClick && <div className="header__info header__info_mobile">
                <span className="header__email">{headerEmail}</span>
                <button className="header__button hover-opacity" onClick={onLogout}>Выйти</button>
              </div>}
      <header className={`header ${isBurgerClick ? "header_double-border" : ""}`}>
        <Link to="/" className="hover-opacity">
          <img className="header__logo-img" src={logo} alt="Логотип проекта Mesto" />
        </Link>
        <Routes>
          <Route path="/sign-up" element={
            <Link to="/sign-in" className="header__link hover-opacity">Войти</Link>
          } />    
          <Route path="/sign-in" element={
            <Link to="/sign-up" className="header__link hover-opacity">Регистрация</Link>
          } />  
          <Route path="/" element={
            <div className="header__container">
              <div className="header__info">
                <span className="header__email">{headerEmail}</span>
                <button className="header__button hover-opacity" onClick={onLogout}>Выйти</button>
              </div>
              <div className={`header__burger hover-opacity 
              ${ isBurgerClick 
                ? "header__burger_active" 
                : "" }`
              } onClick={onBurgerClick} />
            </div>
          } />  
        </Routes>
      </header>
    </>
  );
}

export default Header;