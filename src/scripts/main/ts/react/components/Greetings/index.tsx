import React, { FormEvent, useState } from 'react';

const Greetings = () => {
  const [isRegister, setResiter] = useState(true);
  const [isInputHiding, setInputHiding] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    console.log('SUBMIT');
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
        {isRegister ? 'Регистрация' : 'Вход'}
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
          <div>
            <button> {isRegister ? 'Регистрация' : 'Вход'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Greetings;
