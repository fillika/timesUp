import React from 'react';

import { ModalComponent } from 'App/components/Modal';
import { TimeList } from './components/TimeList';
import { ButtonPanel } from './components/ButtonPanel/index';

import { StyledModal } from './style';
import { usePresenter } from './hooks/usePresenter';

export const Timer = () => {
  const [isOpen, isActive, time, handleClose] = usePresenter();

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
