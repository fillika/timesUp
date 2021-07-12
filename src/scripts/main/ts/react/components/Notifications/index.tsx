import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';

export const Notifications: React.FC = () => {
  const { notifications } = useSelector((state: RootState) => state.app);

  return (
    <div className='notifications'>
      <div className='notifications__wrapper'>
        {notifications.map(notify => {
          const style: any = {
            '--anination-total-time': `${notify.time}ms`,
          };

          return (
            <div style={style} className={`notifications__item notifications__item--${notify.type}`} key={notify.id}>
              {notify.message}
            </div>
          );
        })}
      </div>
    </div>
  );
};
