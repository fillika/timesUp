import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from 'Api/auth';
import { getAllTasks } from 'Utils/helpers/getAllTasks';

const Greetings = () => {
  const [isRegister, setResiter] = useState(true);
  const [isInputHiding, setInputHiding] = useState(false);
  const [isError, setErrorMsg] = useState(null);
  const dispatch = useDispatch();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);

    if (!isRegister) {
      const formData = new FormData(event.target as HTMLFormElement);
      const response = await authAPI.logIn(formData);

      if (response.status === 'success') {
        const token = response.data.token;
        localStorage.setItem('JWT', token);
        getAllTasks(token, dispatch);
      }

      if (response.status === 'fail') {
        localStorage.removeItem('JWT');
        setErrorMsg(response.message);
      }
    }
  };

  const toggleRegister = () => {
    setInputHiding(!isInputHiding);

    if (isRegister) {
      let timerID = setTimeout(() => {
        setResiter(!isRegister);
        clearTimeout(timerID);
      }, 210);
    } else {
      setResiter(!isRegister);
    }
  };

  return (
    <div className='greetings'>
      <div onClick={toggleRegister} className='greetings__toggle'>
        {!isRegister ? 'Регистрация' : 'Вход'}
      </div>
      <div>
        <form onSubmit={submit} className='form'>
          {isRegister && (
            <div className={`form__fields-wrapper ${isInputHiding ? 'form__fields-wrapper--hide' : ''}`}>
              <input type='text' name='username' id='username' required />
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
              <input type='password' name='confirmPassword' id='confirmPassword' required />
              <label htmlFor='confirmPassword'>Confirm password</label>
            </div>
          )}

          <div className='form__error-wrapper'>{isError ? <div className='form__error-msg'>{isError}</div> : null}</div>

          <div>
            <button> {isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Greetings;
