import { ReportsFetchParams } from './types';
import { Dispatch } from 'react';
import { reportsAPI } from 'Api/reports';
import { RootState } from '../rootReducer';
import { sort } from 'Utils/Sort';
import { addReportsResult } from './actionCreators';
import { errSwitchCase } from 'Utils/helpers/errSwitchCase';
import { AppError } from 'Utils/Error';
import { ReportResponse, ServerResponse } from 'Types/serverResponse';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';

export const getReportResult = (token: string, params: ReportsFetchParams) => {
  return (dispatch: Dispatch<any>, getState: () => RootState) => {
    reportsAPI
      .getReports(token, params)
      .then((response: ServerResponse<ReportResponse>) => {
        const message = 'Ничего не найдено по Вашему запросу. Попробуйте другой временной интервал или другое имя.';
        if (response.data.task.length === 0) dispatch(createNotify('warning', message));

        dispatch(addReportsResult(sort.sortReports(response.data.task)));
      })
      .catch((err: AppError) => errSwitchCase(err, dispatch));
  };
};
