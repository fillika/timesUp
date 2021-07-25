import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addExtraTime, timeToInputHadnler } from 'Redux/reducers/timerReducer/actionCreators';

export const TimeList = memo(() => {
  const minutesArr = [1, 2, 5, 10, 15, 30, 60, 120];
  const dispatch = useDispatch();
  
  const handleClick = (el: number) => dispatch(timeToInputHadnler(el));
  const addTime = (extraTime: number) => dispatch(addExtraTime(extraTime));
  
  // useEffect(() => console.log('Render[TimeList]'));

  return (
    <div>
      <ul className='time-list'>
        {minutesArr.map(el => (
          <li key={el} onClick={() => handleClick(el * 60 * 1000)}>
            {el}&nbsp;min
          </li>
        ))}
      </ul>
      <ul className='time-list'>
        <li onClick={() => addTime(10 * 1000)}>+ 10&nbsp;sec</li>
        <li onClick={() => addTime(30 * 1000)}>+ 30&nbsp;sec</li>
      </ul>
    </div>
  );
});
