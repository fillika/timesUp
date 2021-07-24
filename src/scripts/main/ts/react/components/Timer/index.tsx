import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ModalComponent } from 'App/components/Modal';
import { RootState } from 'Redux/reducers/rootReducer';
import { TimeList } from './components/TimeList';
import { StyledIconButton, StyledModal } from './style';

import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

import { mainTheme } from 'App/index';
import { time as timeUtil } from 'Utils/Time';


export const Timer = () => {
  const { isOpen, isActive, time, counter } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: 'TIMER_CLOSE_MODAL' });
  const startTimerHandler = () => dispatch({ type: 'TIMER_START' });
  const stopTimerHandler = () => dispatch({ type: 'TIMER_STOP' });

  useEffect(() => console.log('Render[Timer]'));

  useEffect(() => {
    let intervalID: any;

    if (isActive)
      intervalID = setInterval(() => {
        const newCounter = counter + 100;

        // Todo доработать метод, чтобы выбирать как возвращать время (секунды, милиссекунды и так далее)
        console.log(timeUtil.countTotalTime(newCounter));

        dispatch({
          type: 'TIMER_INCREASE_TIME',
          payload: {
            counter: newCounter,
          },
        });
      }, 100);

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
          <StyledIconButton onClick={startTimerHandler} buttoncolor={mainTheme.palette.success.main}>
            {isActive ? <PauseCircleOutlineIcon /> : <PlayArrowIcon />}
          </StyledIconButton>
          <StyledIconButton onClick={stopTimerHandler} buttoncolor={mainTheme.palette.error.main}>
            <StopIcon />
          </StyledIconButton>
          <StyledIconButton buttoncolor={mainTheme.palette.secondary.main}>
            <RotateLeftIcon />
          </StyledIconButton>
        </div>
      </StyledModal>
    </ModalComponent>
  );
};
