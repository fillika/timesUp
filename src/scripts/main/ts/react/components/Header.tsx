import React, { useState } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';

const Header: React.FC = () => {
  const [state, setstate] = useState(false);

  const onClick = () => {
    setstate(!state);
  };

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input className='header__input' type='text' placeholder='Напишите задачу' />
      </div>

      <div className='header__panel header-panel'>
        <div>
          <div>00:00:05</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={onClick} className='header__button header__button--play'>
            <img src={!state ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
