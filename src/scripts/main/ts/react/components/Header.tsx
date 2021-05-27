import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input className='header__input' type='text' placeholder='Напишите задачу' />
      </div>

      <div className="header__panel">
        <div className='header__button-wrapper'>
          <button className="header__button header__button--play">Start/Stop</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
