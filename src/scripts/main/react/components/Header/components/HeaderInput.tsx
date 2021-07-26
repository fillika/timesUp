import React, { ChangeEvent, KeyboardEvent, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useStyles } from '../hooks/useStyles';

export const HeaderInput = memo<{ name: string; isTimeActive: boolean; toggleTimer: () => void }>(
  ({ toggleTimer, name, isTimeActive }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const onInput = (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: event.target.value });

    const onKeyPress = (event: KeyboardEvent) => event.key === 'Enter' && toggleTimer();
    // useEffect(() => console.log('Render[HeaderInput]'));

    return (
      <div className={classes.wrapper}>
        <input
          onInput={onInput}
          value={name}
          className={classes.input}
          placeholder='Create your task'
          type='text'
          disabled={isTimeActive}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  }
);
