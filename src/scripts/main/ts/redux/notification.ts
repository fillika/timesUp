import { Notification } from 'Types/notifications';

export type Notyfy = {
  notifications: Notification[];
};

const initialState = {
  notifications: [],
};

export const notifyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const result = JSON.parse(JSON.stringify(state.notifications));
      result.unshift(action.payload);

      return {
        ...state,
        notifications: result,
      };
    case 'CLEAR_NOTIFICATION':
      const newArr = JSON.parse(JSON.stringify(state.notifications));
      newArr.pop();

      return {
        ...state,
        notifications: newArr,
      };

    default:
      return state;
  }
}