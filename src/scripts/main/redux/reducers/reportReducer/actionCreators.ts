import { SortedReport } from 'Redux/reducers/reportReducer/types';

export const ADD_REPORTS_RESULT = 'ADD_REPORTS_RESULT',
  CLEAR_REPORTS_RESULT = 'CLEAR_REPORTS_RESULT';

export const addReportsResult = (result: SortedReport) => ({
  type: ADD_REPORTS_RESULT,
  payload: result,
});
export const clearReportResult = () => ({ type: CLEAR_REPORTS_RESULT });
