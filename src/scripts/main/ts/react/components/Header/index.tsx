import React from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { useHeader } from './hooks/useHeader';

const Header: React.FC = () => {
  const {
    onInput,
    toggleTimer,
    onKeyPress,
    activeTask: { name, isTimeActive, totalTime },
  } = useHeader();

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input
          onInput={onInput}
          value={name}
          className='header__input'
          placeholder='Create your task'
          type='text'
          disabled={isTimeActive}
          onKeyPress={onKeyPress}
        />
      </div>

      <div className='header__panel header-panel'>
        <div>
          <div>{totalTime}</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={toggleTimer} className='header__button header__button--play'>
            <img src={!isTimeActive ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
