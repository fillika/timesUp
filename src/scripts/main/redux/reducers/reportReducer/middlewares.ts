import { ReportsFetchParams } from './types';
import { Dispatch } from 'react';
import { reportsAPI } from 'Api/reports';
import { RootState } from '../rootReducer';
import { sort } from 'Utils/Sort';
import { addReportsResult } from './actionCreators';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { AppError } from 'Utils/Error';
import { ReportResponse, ServerResponse } from 'Types/serverResponse';

// Todo типизировать Response
export const getReportResult = (token: string, params: ReportsFetchParams) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    reportsAPI
      .getReports(token, params)
      .then((response: ServerResponse<ReportResponse>) => {
        dispatch(addReportsResult(sort.sortReports(response.data.task)));
      })
      .catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};
