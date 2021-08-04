export type Notification = {
  id: number | string;
  type: 'success' | 'warning' | 'error';
  message: string;
  time: number;
};
