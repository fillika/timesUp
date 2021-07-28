import { ReportState } from './types';
import { ADD_REPORTS_RESULT, CLEAR_REPORTS_RESULT } from './actionCreators';

const initialState: ReportState = {
  sortedTaskList: {},
};

export const reportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_REPORTS_RESULT:
      return {
        ...state,
        sortedTaskList: action.payload,
      };

    case CLEAR_REPORTS_RESULT:
      return {
        ...state,
        sortedTaskList: [],
      };

    default:
      return state;
  }
};
