export type activeTaskState = {
  at: number;
  userID: string;
  name: string;
  start: number;
  stop: number;
  duration: number;
  isTimeActive: boolean;
  totalTime: string;
};

const initialState: activeTaskState = {
  at: 0,
  userID: '60c8be578a7a1e9f8c8edecb',
  name: '',
  start: 0,
  stop: 0,
  duration: 0,
  isTimeActive: false,
  totalTime: '0:00:00'
};

export function activeTaskReducer(state: activeTaskState = initialState, action: any) {
  switch (action.type) {
    case 'SET_ACTIVE_TASK':
      return {
        ...state,
        at: action.payload.at,
        userID: action.payload.userID,
        name: action.payload.name,
        start:action.payload.start,
        stop: action.payload.stop,
        duration: action.payload.duration,
        isTimeActive: action.payload.totalTime,
        totalTime: action.payload.totalTime
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

    default:
      return state;
  }
}
