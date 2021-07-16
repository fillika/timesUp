import React from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { HeaderInput } from './component/HeaderInput';
import { useHeader } from './hooks/useHeader';

const Header: React.FC = () => {
  const { isTimeActive, name, totalTime, toggleTimer } = useHeader();

  return (
    <header className='header'>
      <HeaderInput toggleTimer={toggleTimer} name={name} isTimeActive={isTimeActive} />

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
