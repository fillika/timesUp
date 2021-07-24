import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ModalComponent } from 'App/components/Modal';
import { TimeList } from './components/TimeList';
import { ButtonPanel } from './components/ButtonPanel/index';

import { RootState } from 'Redux/reducers/rootReducer';
import { StyledModal } from './style';
import { setTimeToInput } from 'Redux/reducers/timerReducer/actionCreators';

export const Timer = () => {
  const { isOpen, isActive, time, counter } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: 'TIMER_CLOSE_MODAL' });

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

  // useEffect(() => console.log('Render[Timer]'));

  return (
    <ModalComponent open={isOpen} handleClose={handleClose}>
      <StyledModal>
        <div className='time'>{time}</div>
        <TimeList />
        <ButtonPanel isActive={isActive} />
      </StyledModal>
    </ModalComponent>
  );
};
