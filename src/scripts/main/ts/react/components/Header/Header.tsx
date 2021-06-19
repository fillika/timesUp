import React from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { useHeader } from './useHeader';

const Header: React.FC = () => {
  const { onInput, taskName, isTimeStarted, totalTime, onClick } = useHeader();

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input
          onInput={onInput}
          value={taskName}
          className='header__input'
          placeholder='Create your task'
          type='text'
          disabled={isTimeStarted}
        />
      </div>

      <div className='header__panel header-panel'>
        <div>
          <div>{totalTime}</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={onClick} className='header__button header__button--play'>
            <img src={!isTimeStarted ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
