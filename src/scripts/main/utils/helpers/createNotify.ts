import { Notification } from 'Types/notifications';

export const notify = (type: 'success' | 'warning' | 'error', message: string): Notification => {
  return {
    id: new Date().getTime().toString(16),
    time: 3000,
    type,
    message,
  };
};
