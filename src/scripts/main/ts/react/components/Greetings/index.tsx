import React from 'react';
import { useGreetingsState } from './hooks/useGreetingsState';

const Greetings = () => {
  const [isRegister, isInputHiding, logIn, toggleRegister] = useGreetingsState();

  return (
    <div className='greetings'>
      <div onClick={toggleRegister} className='greetings__toggle'>
        {!isRegister ? 'Регистрация' : 'Вход'}
      </div>
      <div>
        <form onSubmit={logIn} className='form'>
          {isRegister && (
            <div className={`form__fields-wrapper ${isInputHiding ? 'form__fields-wrapper--hide' : ''}`}>
              <input type='text' name='name' id='username' required />
              <label htmlFor='username'>Username</label>
            </div>
          )}

          <div className='form__fields-wrapper'>
            <input type='email' name='email' id='email' required />
            <label htmlFor='email'>Email</label>
          </div>
          <div className='form__fields-wrapper'>
            <input type='password' name='password' id='password' required />
            <label htmlFor='password'>Password</label>
          </div>
          {isRegister && (
            <div className={`form__fields-wrapper ${isInputHiding ? 'form__fields-wrapper--hide' : ''}`}>
              <input type='password' name='passwordConfirm' id='passwordConfirm' required />
              <label htmlFor='passwordConfirm'>Confirm password</label>
            </div>
          )}

          <div className="form__button-wrapper">
            <button className={`button button--${isRegister ? 'primary' : 'success'}`}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Greetings;
