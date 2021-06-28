export type AppState = {
  isLoggin: boolean | null;
  isLoading: boolean,
  token: string | null;
};

const initialState: AppState = {
  token: null,
  isLoggin: null,
  isLoading: true,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'APP_LOG_IN':
      return {
        ...state,
        isLoggin: true,
        token: action.payload,
        isLoading: false
      };
    case 'APP_LOG_OUT':
      return {
        ...state,
        isLoggin: false,
        token: null,
        isLoading: false
      };
    default:
      return state;
  }
};

export { appReducer };
