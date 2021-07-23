import React from 'react';

export const TimeList = () => {
  const time = [1, 2, 5, 10, 15, 30, 60, 120];

  return (
    <ul className='time-list'>
      {time.map(el => (
        <li key={el}>
          {el}&nbsp;min
        </li>
      ))}
    </ul>
  );
};
