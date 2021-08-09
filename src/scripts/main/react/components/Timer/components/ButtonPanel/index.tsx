import React, { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { StyledIconButton } from '../../style';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import { mainTheme } from 'App/index';
import { toggleTimer, TIMER_STOP_AND_CLEAR } from 'Redux/reducers/timerReducer/actionCreators';
import { stopAlarm } from '../../utils/alarm';

export const ButtonPanel = memo<{ isActive: boolean }>(({ isActive }) => {
  const dispatch = useDispatch();

  // useEffect(() => console.log('Render[ButtonPanel]'));

  const toggleHandler = () => dispatch(toggleTimer());
  const stopAndClearHandler = () => {
    stopAlarm();
    dispatch({ type: TIMER_STOP_AND_CLEAR });
  };

  return (
    <div className={'button-panel'}>
      <StyledIconButton
        onClick={toggleHandler}
        buttoncolor={isActive ? mainTheme.palette.warning.main : mainTheme.palette.success.main}>
        {isActive ? <PauseCircleOutlineIcon /> : <PlayArrowIcon />}
      </StyledIconButton>

      <StyledIconButton onClick={stopAndClearHandler} buttoncolor={mainTheme.palette.secondary.main}>
        <RotateLeftIcon />
      </StyledIconButton>
    </div>
  );
});
