import React, { memo, useEffect } from 'react';
import { usePresenter } from './hooks/usePresenter';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IconButton } from '@material-ui/core';

type ContinueButton = {
  name: string;
};

import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

// memo стоит на true, чтобы кнопка продолжения не рендерилась при изменении имени таска
export const ContinueButton = memo<ContinueButton>(({ name }) => {
  const [startTask, isTimeActive] = usePresenter(name);
  const classes = useStyles();

  // useEffect(() => console.log('Render[ContinueButton]'));

  return (
    <IconButton
      onClick={startTask}
      className={classes.iconButton}
      color='secondary'
      disabled={isTimeActive}
      title='Продолжить задачу'>
      <PlayArrowIcon />
    </IconButton>
  );
});
