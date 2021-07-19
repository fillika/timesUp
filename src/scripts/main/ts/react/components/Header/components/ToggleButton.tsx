import React, { memo } from 'react';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { IconButton } from '@material-ui/core';

import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    width: 50,
    height: 50,
    padding: 0,
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
  },
  playIcon: {
    color: theme.palette.secondary.main,
    fontSize: 36
  },
  stopIcon: {
    color: theme.palette.error.main,
    fontSize: 36
  },
}));

export const ToggleButton = memo<{ isTimeActive: boolean; toggleTimer: () => void }>(
  ({ isTimeActive, toggleTimer }) => {
    const classes = useStyles();
    return (
      <div className='header__button-wrapper'>
        <IconButton onClick={toggleTimer} className={classes.iconButton}>
          {!isTimeActive ? (
            <PlayArrowIcon className={classes.playIcon} />
          ) : (
            <StopIcon className={classes.stopIcon} />
          )}
        </IconButton>
        {/* <button onClick={toggleTimer} className='header__button header__button--play'>
          <img src={!isTimeActive ? playBtn : stopBtn} alt='Иконка' />
        </button> */}
      </div>
    );
  }
);
