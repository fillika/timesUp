import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTimeToInput } from 'Redux/reducers/timerReducer/actionCreators';

export const TimeList = memo(() => {
  const minutesArr = [1, 2, 5, 10, 15, 30, 60, 120];
  const dispatch = useDispatch();
  useEffect(() => console.log('Render[TimeList]'));

  const handleClick = (el: number) => dispatch(setTimeToInput(el));

  return (
    <ul className='time-list'>
      {minutesArr.map(el => (
        <li key={el} onClick={() => handleClick(el * 60 * 1000)}>
          {el}&nbsp;min
        </li>
      ))}
    </ul>
  );
});
