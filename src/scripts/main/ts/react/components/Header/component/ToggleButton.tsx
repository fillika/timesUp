import React, { memo } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';

export const ToggleButton = memo<{ isTimeActive: boolean; toggleTimer: () => void }>(
  ({ isTimeActive, toggleTimer }) => {
    return (
      <div className='header__button-wrapper'>
        <button onClick={toggleTimer} className='header__button header__button--play'>
          <img src={!isTimeActive ? playBtn : stopBtn} alt='Иконка' />
        </button>
      </div>
    );
  }
);
