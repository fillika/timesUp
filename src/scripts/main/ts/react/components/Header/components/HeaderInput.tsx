import React, { ChangeEvent, KeyboardEvent, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';

export const HeaderInput = memo<{ name: string; isTimeActive: boolean; toggleTimer: () => void }>(
  ({ toggleTimer, name, isTimeActive }) => {
    const dispatch = useDispatch();

    const onInput = (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: event.target.value });

    const onKeyPress = (event: KeyboardEvent) => event.key === 'Enter' && toggleTimer();
    // useEffect(() => console.log('Render[HeaderInput]'));

    return (
      <div className='header__input-wrapper'>
        <input
          onInput={onInput}
          value={name}
          className='header__input'
          placeholder='Create your task'
          type='text'
          disabled={isTimeActive}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
);
