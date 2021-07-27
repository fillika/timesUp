import { SortedReport } from './types';
import { ADD_REPORTS_RESULT } from './actionCreators';

const initialState: SortedReport = {};

export const reportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_REPORTS_RESULT:
      return {
        ...action.payload
      }

    default:
      return state;
  }
};
