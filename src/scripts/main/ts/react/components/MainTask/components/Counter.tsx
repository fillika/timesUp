import React from 'react';
import { TimeType } from 'Types/tasks';
import { useStyles } from '../hooks/useStyles';

type Counter = {
  isActive: boolean;
  time: TimeType[] | undefined;
  onClick: (value: React.SetStateAction<boolean>) => void;
};

export const Counter: React.FC<Counter> = ({ isActive, time, onClick: setActive }) => {
  const toggleActive = () => setActive(!isActive);
  const classes = useStyles();

  if (time !== undefined) {
    if (time.length > 1) {
      return (
        <div className={classes.counter} onClick={toggleActive}>
          {time.length}
        </div>
      );
    } else {
      setActive(false);
      return null;
    }
  } else {
    return null;
  }
};
