import React from 'react';
import { StyledCounter, StyledParentTask } from './style';

export const ParentTask: React.FC<{ clickHadler: () => void }> = ({ clickHadler }) => {
  return (
    <StyledParentTask>
      <StyledCounter onClick={clickHadler}>2</StyledCounter>
      <div className="name">Name</div>
      <div>
        <span className="timeRange">10:20:06&nbsp;-&nbsp;11:04:07</span>
        <span className="totalTime">00:24:09</span>
      </div>
    </StyledParentTask>
  );
};
