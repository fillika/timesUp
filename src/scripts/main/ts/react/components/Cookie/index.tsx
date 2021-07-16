import React from 'react';
import { useCookieState } from './hooks/useCookieState';

export const Cookie = () => {
  const [isCookieHide, onClick] = useCookieState();

  if (isCookieHide) {
    return null;
  }

  return (
    <div className='cookie'>
      <div className='cookie__text'>
        Этот сайт использует cookie для хранения данных. Продолжая использовать сайт, Вы даете согласие на работу с
        этими файлами.
      </div>
      <div className='cookie__btn-wrapper'>
        <button onClick={onClick} className='button'>
          Принять и закрыть
        </button>
      </div>
    </div>
  );
};
