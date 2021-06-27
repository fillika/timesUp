import React from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { useHeader } from './useHeader';

const Header: React.FC = () => {
  const { onInput, onClick, onKeyPress, activeTask } = useHeader();

  return (
    <header className='header'>
      <div className='header__input-wrapper'>
        <input
          onInput={onInput}
          value={activeTask.name}
          className='header__input'
          placeholder='Create your task'
          type='text'
          disabled={activeTask.isTimeActive}
          onKeyPress={onKeyPress}
        />
      </div>

      <div className='header__panel header-panel'>
        <div>
          <div>{activeTask.totalTime}</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={onClick} className='header__button header__button--play'>
            <img src={!activeTask.isTimeActive ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
