import { ReportsFetchParams } from './types';
import { Dispatch } from 'react';
import { reportsAPI } from 'Api/reports';
import { RootState } from '../rootReducer';
import { sort } from 'Utils/Sort';
import { addReportsResult } from './actionCreators';

// Todo типизировать Response
export const getReportResult = (token: string, params: ReportsFetchParams) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    reportsAPI
      .getReports(token, params)
      .then(response => {
        dispatch(addReportsResult(sort.sortReports(response.data.task)));
      })
      .catch(err => console.error(`Some err: ${err}`));
  };
};
