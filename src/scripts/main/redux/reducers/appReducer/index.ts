import { removeJWTToken, setJWTToken } from 'Utils/helpers/JWTHadlers';

import { APP_LOG_IN, APP_LOG_OUT } from './actionCreator';

export type AppState = {
  isLoggin: boolean | null;
  isLoading: boolean;
};

const initialState: AppState = {
  isLoggin: null,
  isLoading: true,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case APP_LOG_IN:
      setJWTToken(action.payload);

      return {
        ...state,
        isLoggin: true,
        isLoading: false,
      };
      
    case APP_LOG_OUT:
      removeJWTToken();

      return {
        ...state,
        isLoggin: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export { appReducer };
