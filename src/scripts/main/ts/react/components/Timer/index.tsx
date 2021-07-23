import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ModalComponent } from 'App/components/Modal';
import { RootState } from 'Redux/reducers/rootReducer';
import { TimeList } from './components/TimeList';
import { StyledIconButton, StyledModal } from './style';

import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export const Timer = () => {
  const { isOpen, isActive } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleClose = () => dispatch({ type: 'TIMER_CLOSE_MODAL' });

  return (
    <ModalComponent open={isOpen} handleClose={handleClose}>
      <StyledModal>
        <div className='time'>00:00:00.00</div>

        <TimeList />

        <div className={'button-panel'}>
          <StyledIconButton>
            {isActive ? <PauseCircleOutlineIcon /> : <PlayArrowIcon />}
          </StyledIconButton>
          <IconButton>
            <StopIcon />
          </IconButton>
          <IconButton>
            <RotateLeftIcon />
          </IconButton>
        </div>
      </StyledModal>
    </ModalComponent>
  );
};
