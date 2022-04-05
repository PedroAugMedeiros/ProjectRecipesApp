import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoginLogo from '../components/LoginLogo';
import RecipesContext from '../context/RecipesContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  const { user } = useContext(RecipesContext);

  const validate = () => {
    const NUMERO_MINIMO = 6;
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if ((regex.test(email)) && (password.length >= NUMERO_MINIMO)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
    validate();
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
    validate();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    user.setEmail(email);
    history.push('/comidas');
  };

  return (
    <section className="Login">
      <LoginLogo />
      <Form className="LoginForm">
        <Form.Control
          className="w-100 mb-2"
          data-testid="email-input"
          type="email"
          id="email-bar"
          placeholder="E-mail"
          autoComplete="username"
          name="email"
          value={ email }
          onChange={ handleChangeEmail }
        />

        <Form.Control
          className="w-100 mb-2"
          data-testid="password-input"
          type="password"
          id="epassword-bar"
          placeholder="Senha"
          autoComplete="current-password"
          name="password"
          value={ password }
          onChange={ handleChangePassword }
        />

        <Button
          className="w-100 mb-2"
          variant="primary"
          data-testid="login-submit-btn"
          disabled={ disable }
          onClick={ handleClick }
        >
          Entrar
        </Button>
      </Form>
    </section>
  );
}

export default Login;
