export type AppState = {
  isLoggin: boolean | null;
  token: string | null;
};

const initialState: AppState = {
  token: null,
  isLoggin: null,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'APP_LOG_IN':
      return {
        ...state,
        isLoggin: true,
        token: action.payload
      };
    case 'APP_LOG_OUT':
      return {
        ...state,
        isLoggin: false,
        token: null,
      };
    default:
      return state;
  }
};

export { appReducer };
