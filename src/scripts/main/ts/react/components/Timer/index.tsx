import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ModalComponent } from 'App/components/Modal';
import { RootState } from 'Redux/reducers/rootReducer';
import {
  setTimeToInput,
  toggleTimer,
  TIMER_STOP_AND_CLEAR,
} from 'Redux/reducers/timerReducer/actionCreators';
import { TimeList } from './components/TimeList';
import { StyledIconButton, StyledModal } from './style';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import { mainTheme } from 'App/index';

export const Timer = () => {
  const { isOpen, isActive, time, counter } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: 'TIMER_CLOSE_MODAL' });
  const toggleHandler = () => dispatch(toggleTimer());
  const stopAndClearHandler = () => dispatch({ type: TIMER_STOP_AND_CLEAR });

  useEffect(() => console.log('Render[Timer]'));

  useEffect(() => {
    let intervalID: any;

    if (isActive) {
      intervalID = setInterval(() => {
        const newCounter = counter - 100;
        dispatch(setTimeToInput(newCounter));
      }, 100);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [counter, isActive]);

  return (
    <ModalComponent open={isOpen} handleClose={handleClose}>
      <StyledModal>
        <div className='time'>{time}</div>

        <TimeList />

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
      </StyledModal>
    </ModalComponent>
  );
};
