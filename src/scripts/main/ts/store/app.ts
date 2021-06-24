export type AppState = {
  userID: string;
};

const initialState: AppState = {
  userID: '60c8be578a7a1e9f8c8edecb',
};

const appReducer = (state = initialState, action: any) => {
  switch (action.payload) {
    case 'TEST':
      return {
        ...state,
      };
      break;

    default:
      return state;
  }
};

export { appReducer };
