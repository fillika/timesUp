import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ThemeProvider } from '@material-ui/core/styles';
import { deleteModalTheme } from './styles/theme';

type TDialogDelete = {
  open: boolean;
  name: string;
  closeHandler: () => void;
  deleteHandler: () => void;
};

export const DeleteDialog: React.FC<TDialogDelete> = ({ open, name, closeHandler, deleteHandler }) => {
  const clickHandler = () => {
    closeHandler();
    deleteHandler();
  };

  return (
    <ThemeProvider theme={deleteModalTheme}>
      <Dialog open={open} onClose={closeHandler} aria-labelledby='alert-dialog-title'>
        <DialogTitle id='alert-dialog-title' aria-describedby='alert-dialog-description'>
          Точно удалить?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{name}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeHandler} color='secondary' variant='contained' autoFocus>
            Отмена
          </Button>
          <Button onClick={clickHandler} color='primary' variant='contained'>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
