export type AppState = {
  isLoggin: boolean;
  token: string;
  userID: string;
};

const initialState: AppState = {
  userID: '60c8be578a7a1e9f8c8edecb',
  token: '',
  isLoggin: false,
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'APP_SET_IS_LOGGIN':
      return {
        ...state,
        isLoggin: action.payload,
      };

    default:
      return state;
  }
};

export { appReducer };
