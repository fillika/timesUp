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
    // Todo удалить потом. Добавил временно, чтобы не авторизовываться по 10 раз
    case 'APP_ALWAYS_LOG_IN':
      return {
        ...state,
        isLoggin: true,
        token: action.payload
      };
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
