import React from 'react';
import { useGreetingsState } from './hooks/useGreetingsState';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp/index';

const Greetings = () => {
  const [isRegister, toggleRegister] = useGreetingsState();

  return (
    <div className='greetings'>
      <div onClick={toggleRegister} className='greetings__toggle'>
        {!isRegister ? 'Регистрация' : 'Вход'}
      </div>
      {isRegister ? <SignUp /> : <LogIn />}
    </div>
  );
};

export default Greetings;
