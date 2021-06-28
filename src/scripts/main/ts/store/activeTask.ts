export type activeTaskState = {
  at: number;
  name: string;
  start: number;
  stop: number;
  duration: number;
  isTimeActive: boolean;
  totalTime: string;
};

const initialState: activeTaskState = {
  at: 0,
  name: '',
  start: 0,
  stop: 0,
  duration: 0,
  isTimeActive: false,
  totalTime: '00:00:00',
};

export function activeTaskReducer(state: activeTaskState = initialState, action: any) {
  switch (action.type) {
    case 'SET_ACTIVE_TASK':
      return {
        ...state,
        at: action.payload.at,
        userID: action.payload.userID,
        name: action.payload.name,
        start: action.payload.start,
        stop: action.payload.stop,
        duration: action.payload.duration,
        isTimeActive: action.payload.totalTime,
        totalTime: action.payload.totalTime,
      };

    case 'SET_ACTIVE_TASK_TOTAL_TIME':
      return {
        ...state,
        totalTime: action.payload,
      };

    case 'UPDATE_ACTIVE_TASK_STATUS':
      return {
        ...state,
        isTimeActive: action.payload,
      };

    case 'UPDATE_ACTIVE_TASK_NAME':
      return {
        ...state,
        name: action.payload,
      };

    case 'UPDATE_ACTIVE_TASK_START':
      return {
        ...state,
        start: action.payload,
      };

    case 'UPDATE_ACTIVE_TASK_TIME':
      return {
        ...state,
        stop: action.payload.stop,
        duration: action.payload.duration,
        at: action.payload.at,
      };

    case 'RESET_ACTIVE_TASK_PROPS':
      return {
        ...state,
        totalTime: action.payload.totalTime,
        name: action.payload.name,
        duration: action.payload.duration,
      };

    default:
      return state;
  }
}