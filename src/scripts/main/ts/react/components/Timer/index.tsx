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
    let hidden: string,
      visibilityChange: string = '';

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if (typeof (document as any).msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    document.addEventListener(
      visibilityChange,
      () => {
        if ((document as any)[hidden]) {
          console.log('Не активна', new Date().toLocaleDateString());
        } else {
          console.log('Активна');
        }
      },
      false
    );
  }, []);

  useEffect(() => {
    let intervalID: any;

    if (isActive) {
      intervalID = setTimeout(() => {
        dispatch(setTimeToInput(counter - 1000));
      }, 1000);
    }

    return () => {
      clearTimeout(intervalID);
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
