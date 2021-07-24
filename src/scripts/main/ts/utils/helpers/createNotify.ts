import { Notification } from 'Types/notifications';

export const notify = (type: string, message: string, time: number): Notification => {
  return {
    id: new Date().getTime().toString(16),
    time,
    type,
    message,
  };
};

