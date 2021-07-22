import React from 'react';
import { StyledListHead } from './style';

export const DayResultHead: React.FC<{ date: string }> = ({ date }) => {
  return (
    <StyledListHead>
      <div className='date'>{date}</div>
      <div className='totalTime'>03:43:04</div>
    </StyledListHead>
  );
};
