import React from 'react';
import { Link } from 'react-router-dom';

export const ConfirmMessage = () => {
  return (
    <div>
      <p style={{ marginBottom: 10 }}>На вашу почту было отправлено письмо с инструкцией для завершения регистрации.</p>
      <p>
        <Link to='/' className='button button--secondary'>
          Понятно
        </Link>
      </p>
    </div>
  );
};
