import { useState } from "react";
import { Link } from 'react-router-dom';

import FormForAuth from "./FormForAuth";

function Register ({ onRegister }) {
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

    onRegister(email, password);

    resetForm(); // Временное решение
  }

  return (
    <FormForAuth 
      title="Регистрация"
      formName="sign-up" 
      btnText="Зарегистрироваться"
      formValue={formValue}
      onChange={handleChange}
      onSubmit={handleSubmit}>
        <Link to="/sign-in" className="form-for-auth__to-login hover-opacity">Уже зарегистрированы? Войти</Link>
    </FormForAuth>
  );
}

export default Register;