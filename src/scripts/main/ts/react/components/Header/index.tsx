import React from 'react';

import { HeaderInput } from './component/HeaderInput';
import { useHeader } from './hooks/useHeader';
import { TotalTime } from './component/TotalTime';
import { ToggleButton } from './component/ToggleButton';

const Header: React.FC = () => {
  const { isTimeActive, name, totalTime, toggleTimer } = useHeader();

  return (
    <header className='header'>
      <HeaderInput toggleTimer={toggleTimer} name={name} isTimeActive={isTimeActive} />

      <div className='header__panel header-panel'>
        <TotalTime totalTime={totalTime} />
        <ToggleButton isTimeActive={isTimeActive} toggleTimer={toggleTimer} />
      </div>
    </header>
  );
};

export default Header;
