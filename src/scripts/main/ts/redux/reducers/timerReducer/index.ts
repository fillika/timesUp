import { Action, TimerState } from './types';
import {
  TIMER_CLOSE_MODAL,
  TIMER_OPEN_MODAL,
  TIMER_SET_COUNTER,
  TIMER_SET_TIME,
  TIMER_START,
  TIMER_STOP,
  TIMER_STOP_AND_CLEAR,
} from './actionCreators';

const initialState: TimerState = {
  isOpen: false,
  isActive: false,
  counter: 0,
  time: '00:00:00.00',
};

export const timerReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case TIMER_OPEN_MODAL: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case TIMER_CLOSE_MODAL: {
      return {
        ...state,
        isOpen: false,
      };
    }

    case TIMER_SET_COUNTER: {
      if (action.payload) {
        return {
          ...state,
          counter: action.payload.counter || 0,
        };
      }
      return state;
    }
    case TIMER_SET_TIME: {
      if (action.payload) {
        return {
          ...state,
          time: action.payload.time || '00:00:00.00',
        };
      }
      return state;
    }

    case TIMER_STOP_AND_CLEAR: {
      return {
        ...state,
        counter: 0,
        time: '00:00:00.00',
        isActive: false,
      };
    }

    case TIMER_START: {
      return {
        ...state,
        isActive: true,
      };
    }

    case TIMER_STOP: {
      return {
        ...state,
        isActive: false,
      };
    }

    default: {
      return state;
    }
  }
};
