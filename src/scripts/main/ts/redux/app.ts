import { Notification } from 'Types/notifications';

export type AppState = {
  isLoggin: boolean | null;
  isLoading: boolean;
  token: string | null;
  notifications: Notification[];
};

const initialState: AppState = {
  token: null,
  isLoggin: null,
  isLoading: true,
  notifications: [],
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'APP_LOG_IN':
      localStorage.setItem('JWT', action.payload);

      return {
        ...state,
        isLoggin: true,
        token: action.payload,
        isLoading: false,
      };
    case 'APP_LOG_OUT':
      localStorage.removeItem('JWT');

      return {
        ...state,
        isLoggin: false,
        token: null,
        isLoading: false,
      };
    case 'APP_SET_NOTIFICATION':
      const result = JSON.parse(JSON.stringify(state.notifications));
      result.unshift(action.payload);

      return {
        ...state,
        notifications: result,
      };
    case 'APP_CLEAR_NOTIFICATION':
      const newArr = JSON.parse(JSON.stringify(state.notifications));
      newArr.pop();

      return {
        ...state,
        notifications: newArr,
      };

    default:
      return state;
  }
};

export { appReducer };
