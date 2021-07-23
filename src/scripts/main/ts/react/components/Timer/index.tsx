import React from 'react';
import { ModalComponent } from 'App/components/Modal';
import { StyledModal } from './style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';

export const Timer = () => {
  const isOpen = useSelector((state: RootState) => state.timer.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: 'TIMER_CLOSE_MODAL' });

  return (
    <ModalComponent open={isOpen} handleClose={handleClose}>
      <StyledModal>
        <h1>Some modal</h1>
        <p>Some content</p>
      </StyledModal>
    </ModalComponent>
  );
};
