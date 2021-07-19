import React, { memo } from 'react';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './hooks/useStyles';
import clsx from 'clsx';

export const ToggleButton = memo<{ isTimeActive: boolean; toggleTimer: () => void }>(
  ({ isTimeActive, toggleTimer }) => {
    const classes = useStyles();
    const iconBtnClassName = isTimeActive ? classes.iconButtonActive : {};

    return (
      <div className='header__button-wrapper'>
        <IconButton onClick={toggleTimer} className={clsx(classes.iconButton, iconBtnClassName)}>
          {!isTimeActive ? <PlayArrowIcon className={classes.playIcon} /> : <StopIcon className={classes.stopIcon} />}
        </IconButton>
      </div>
    );
  }
);
