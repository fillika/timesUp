import { ReportsFetchParams } from './types';
import { Dispatch } from 'react';
import { reportsAPI } from 'Api/reports';
import { RootState } from '../rootReducer';
import { sortReports } from 'Utils/Sort/sortReports';
import { addReportsResult, clearReportResult } from './actionCreators';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { AppError } from 'Utils/Error';
import { ReportResponse, ServerResponse } from 'Types/serverResponse';
import { notifyWarning } from 'Redux/reducers/notifyReducer/actionCreators';

const notFoundMessage = 'Ничего не найдено по Вашему запросу. Попробуйте другой временной интервал или другое имя.';

export const getReportResult = (token: string, params: ReportsFetchParams) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    reportsAPI
      .getReports(token, params)
      .then((response: ServerResponse<ReportResponse>) => {
        if (response.data.task.length === 0) dispatch(notifyWarning(notFoundMessage));

        dispatch(clearReportResult());
        dispatch(addReportsResult(sortReports(response.data.task)));
      })
      .catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};
