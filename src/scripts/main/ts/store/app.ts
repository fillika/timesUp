export type AppState = {
  isLoggin: boolean;
  token: string | null;
};

const initialState: AppState = {
  token: null,
  isLoggin: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'APP_SET_IS_LOGGIN':
      return {
        ...state,
        isLoggin: action.payload,
      };

    case 'APP_LOG_IN':
      return {
        ...state,
        isLoggin: true,
        token: action.payload
      };
    default:
      return state;
  }
};

export { appReducer };
