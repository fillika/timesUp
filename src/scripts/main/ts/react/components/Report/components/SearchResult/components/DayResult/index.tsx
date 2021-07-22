import React, { useState } from 'react';

import { ParentTask } from './components/ParentTask';
import { DayResultHead } from './components/DayResultHead';
import { ChildList } from './components/ChildList';
import { StyledDayResult } from './style';

export const DayResult = () => {
  const [isActive, setActive] = useState(false);

  const clickHandler = () => setActive(!isActive);

  return (
    <StyledDayResult>
      <DayResultHead />

      <ul>
        <li>
          <ParentTask clickHadler={clickHandler} />
          {isActive ? <ChildList /> : null}
        </li>
      </ul>
    </StyledDayResult>
  );
};
