import React from 'react';
import { TimeType } from 'Types/tasks';

type Counter = {
  isActive: boolean;
  time: TimeType[] | undefined;
  onClick: (value: React.SetStateAction<boolean>) => void;
};

export const Counter: React.FC<Counter> = ({ isActive, time, onClick: setActive }) => {
  const toggleActive = () => setActive(!isActive);

  if (time !== undefined) {
    if (time.length > 1) {
      return (
        <div className='task__counter' onClick={toggleActive}>
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
