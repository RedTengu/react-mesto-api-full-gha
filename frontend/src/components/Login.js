import { useState } from "react";

import FormForAuth from "./FormForAuth";

function Login ({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {

    const {name, value} = e.target
    
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const resetForm = () => {
    setFormValue({
      email: '',
      password: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = formValue;

    onLogin(email, password);

    resetForm(); // Временное решение
  }

  return (
    <FormForAuth 
      title="Вход"
      formName="sign-in" 
      btnText="Войти"
      formValue={formValue}
      onChange={handleChange}
      onSubmit={handleSubmit} />
  );
}

export default Login;