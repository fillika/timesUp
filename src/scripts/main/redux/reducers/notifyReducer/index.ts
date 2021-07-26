import { Notification } from 'Types/notifications';
import { SET_NOTIFICATION } from './actionCreators';

export type Notify = {
  notifications: Notification[];
};

const initialState = {
  notifications: [],
};

export const notifyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      const result = JSON.parse(JSON.stringify(state.notifications));
      result.unshift(action.payload);

      return {
        ...state,
        notifications: result,
      };

    default:
      return state;
  }
};
