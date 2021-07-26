import { useDispatch } from 'react-redux';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';

export function useGlobalError() {
  const dispatch = useDispatch();
  let message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

  const commonSwitchCase = (err: AppError) => {
    switch (err.statusCode) {
      case 401:
        message = 'Пожалуйста, залогиньтесь заново';
        dispatch(createNotify('warning', message));

        localStorage.removeItem('JWT');
        break;
      case 404:
        message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
        dispatch(createNotify('error', message));
        break;

      default:
        dispatch(createNotify('error', err.message));
        break;
    }
  };

  const activeTaskErrorHandler = (err: AppError) => {
    commonSwitchCase(err);
  };

  const getTasksErrorHandlerErr = (err: AppError) => {
    commonSwitchCase(err);
    dispatch({ type: 'APP_LOG_OUT' });
  };

  const createTaskErrorHandler = (err: AppError) => {
    commonSwitchCase(err);
  };

  const delTaskByNameErrHadler = (err: AppError) => {
    switch (err.statusCode) {
      case 400:
        dispatch(createNotify('error', err.message));

        break;
      case 401:
        message = 'Пожалуйста, залогиньтесь заново';
        dispatch(createNotify('warning', message));
        localStorage.removeItem('JWT');
        break;
      case 404:
        message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
        dispatch(createNotify('error', message));
        break;

      default:
        dispatch(createNotify('error', err.message));
        break;
    }
  };
  const delTaskByIdErrHadler = (err: AppError) => {
    commonSwitchCase(err);
  };

  const updTaskByNameErrHadler = (err: AppError) => {
    commonSwitchCase(err);
  };

  const updTaskByIdErrHadler = (err: AppError) => {
    commonSwitchCase(err);
  };

  return {
    getTasksErrorHandlerErr,
    activeTaskErrorHandler,
    createTaskErrorHandler,
    delTaskByNameErrHadler,
    delTaskByIdErrHadler,
    updTaskByNameErrHadler,
    updTaskByIdErrHadler,
  };
}
