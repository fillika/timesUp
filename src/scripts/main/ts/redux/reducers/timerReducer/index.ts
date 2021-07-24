export type TimerState = {
  isOpen: boolean;
  isActive: boolean;
  counter: number;
  time: string;
};

interface Action {
  type: string;
  payload?: {
    time?: string;
    counter?: number;
  };
}

const initialState: TimerState = {
  isOpen: false,
  isActive: false,
  counter: 0,
  time: '00:00:00.00',
};

export const timerReducer = (state = initialState, action: Action) => {
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
    case 'TIMER_SET_TIME':
      if (action.payload)
        return {
          ...state,
          time: action.payload.time || '00:00:00.00',
        };
    case 'TIMER_INCREASE_TIME':
      if (action.payload)
        return {
          ...state,
          counter: action.payload.counter,
        };
    case 'TIMER_START':
      return {
        ...state,
        isActive: true,
      };
    case 'TIMER_STOP':
      return {
        ...state,
        isActive: false,
      };

    default:
      return state;
  }
};
