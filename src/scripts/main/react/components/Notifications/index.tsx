import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { useStyles } from './hooks/useStyles';
import { NotifyItem } from './components/NotifyItem/index';

export const Notifications: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notify.notifications);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {notifications.map(notify => (
          <NotifyItem notify={notify} key={notify.id} />
        ))}
      </div>
    </div>
  );
};
