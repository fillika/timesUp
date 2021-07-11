import React from 'react';
import { useGreetingsState } from './hooks/useGreetingsState';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp/index';

const Greetings = () => {
  const [isRegister, toggleRegister] = useGreetingsState();

  return (
    <div className='formWrapper'>
      <div onClick={toggleRegister} className='formWrapper__toggle'>
        {!isRegister ? 'Регистрация' : 'Вход'}
      </div>
      {isRegister ? <SignUp /> : <LogIn />}
    </div>
  );
};

export default Greetings;
