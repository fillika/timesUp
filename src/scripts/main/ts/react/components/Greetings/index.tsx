import React, { FormEvent } from 'react';

const Greetings = () => {
  const submit = (event: FormEvent) => {
    event.preventDefault();
    console.log('SUBMIT');
  };

  return (
    <div className='greetings'>
      <div>
        <form onSubmit={submit} className='form'>
          <div className='form__fields-wrapper'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' id='username' placeholder='Username' />
          </div>
          <div className='form__fields-wrapper'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' placeholder='Email' />
          </div>
          <div className='form__fields-wrapper'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' />
          </div>
          <div className='form__fields-wrapper'>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <input type='password' name='confirmPassword' id='confirmPassword' />
          </div>
          <div>
            <button>Регистрация</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Greetings;
