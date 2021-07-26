import React from 'react';
import { useCookieState } from './hooks/useCookieState';
import Button from '@material-ui/core/Button';
import { useStyles } from './hooks/useStyles';

export const Cookie = () => {
  const [isCookieHide, onClick] = useCookieState();
  const classes = useStyles();

  if (isCookieHide) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div>
        Этот сайт использует cookie для хранения данных. Продолжая использовать сайт, Вы даете согласие на работу с
        этими файлами.
      </div>
      <div className={classes.wrapper}>
        <Button onClick={onClick} variant="contained">Принять и закрыть</Button>
      </div>
    </div>
  );
};
