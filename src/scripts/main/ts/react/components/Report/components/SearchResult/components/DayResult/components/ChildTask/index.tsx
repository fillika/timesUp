import React from 'react';
import { StyledChildTask } from './style';

export const ChildTask: React.FC<{ name: string }> = ({ name }) => {
  return (
    <StyledChildTask>
      <div className='name'>{name}</div>
      <div>
        <span className='timeRange'>10:20:06&nbsp;-&nbsp;11:04:07</span>
        <span className='totalTime'>00:24:09</span>
      </div>
    </StyledChildTask>
  );
};
