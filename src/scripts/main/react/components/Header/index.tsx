import React from 'react';

import { HeaderInput } from './components/HeaderInput';
import { useHeader } from './hooks/useHeader';
import { TotalTime } from './components/TotalTime';
import { ToggleButton } from './components/ToggleButton';
import { useStyles } from './hooks/useStyles';

const Header: React.FC = () => {
  const { isTimeActive, name, totalTime, toggleTimer } = useHeader();
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <HeaderInput toggleTimer={toggleTimer} name={name} isTimeActive={isTimeActive} />

      <div className={classes.panel}>
        <TotalTime totalTime={totalTime} />
        <ToggleButton isTimeActive={isTimeActive} toggleTimer={toggleTimer} />
      </div>
    </header>
  );
};

export default Header;
