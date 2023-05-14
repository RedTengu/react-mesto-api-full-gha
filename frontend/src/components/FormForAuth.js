// Компонент формы логина и регистрации
function FormForAuth ({ title, formName, btnText, children, onSubmit, formValue, onChange}) {
  return (
    <main className="content">
      <div className="form-for-auth">
        <h1 className="form-for-auth__title">{title}</h1>
        <form className="form-for-auth__form" name={formName} onSubmit={onSubmit}>
          <input
            className="form-for-auth__input"
            type="email"
            id="auth-email"
            name="email"
            minLength="3"
            maxLength="40"
            placeholder="Email"
            onChange={onChange}
            value={formValue.email}
            required />
          <input
            className="form-for-auth__input"
            type="password"
            id="auth-password"
            name="password"
            minLength="8"
            maxLength="40"
            placeholder="Пароль"
            onChange={onChange}
            value={formValue.password}
            required />
          <button className="form-for-auth__submit" type="submit">{btnText}</button>
          {children}
        </form>
      </div>
    </main>
  );
}

export default FormForAuth;