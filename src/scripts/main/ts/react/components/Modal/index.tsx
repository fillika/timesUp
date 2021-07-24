import React, { ReactElement } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

export const ModalComponent: React.FC<{ open: boolean; handleClose: () => void; children?: ReactElement }> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Modal
      className={'classes.modal'}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <div>{children}</div>
      </Fade>
    </Modal>
  );
};
