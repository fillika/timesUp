import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Notification } from 'Types/notifications';
import Slide from '@material-ui/core/Slide';
import clsx from 'clsx';
import { useStyles } from '../../hooks/useStyles';

export const NotifyItem: React.FC<{ notify: Notification }> = ({ notify }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setIsActive(false);
    }, notify.time);

    return () => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
      clearTimeout(timeoutID);
    };
  }, []);

  const notifyType = () => {
    switch (notify.type) {
      case 'success':
        return classes.itemSuccess;
      case 'warning':
        return classes.itemWarning;
      case 'error':
        return classes.itemError;
      default:
        return {};
    }
  };

  return (
    <Slide in={isActive} direction='left' unmountOnExit>
      <div className={clsx(classes.item, notifyType())}>{notify.message}</div>
    </Slide>
  );
};