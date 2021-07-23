export type TimerState = {
  isOpen: boolean;
};

const initialState: TimerState = {
  isOpen: false,
};

const timerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'TIMER_OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
      };
    case 'TIMER_CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export { timerReducer };
