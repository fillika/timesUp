import { useDispatch } from 'react-redux';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Utils/helpers/createNotify';

export function useGlobalError() {
  const dispatch = useDispatch();
  let message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

  const commonSwitchCase = (err: AppError) => {
    switch (err.statusCode) {
      case 401:
        message = 'Пожалуйста, залогиньтесь заново';
        createNotify('warning', message, dispatch);
        localStorage.removeItem('JWT');
        break;
      case 404:
        message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
        createNotify('error', message, dispatch);
        break;

      default:
        createNotify('error', err.message, dispatch);
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

  const authErrorHandler = (err: AppError) => {
    switch (err.statusCode) {
      case 401:
        message = 'Неверный логин или пароль';
        createNotify('error', message, dispatch);
        break;
      case 404:
        message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
        createNotify('error', message, dispatch);
        break;

      default:
        createNotify('error', err.message, dispatch);
        break;
    }
  };

  const signUpErrorHandler = (err: AppError) => {
    switch (err.statusCode) {
      case 400:
        // message = 'Неверный логин или пароль';
        createNotify('error', err.message, dispatch, 5000);
        break;
      case 404:
        message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
        createNotify('error', message, dispatch);
        break;

      default:
        createNotify('error', err.message, dispatch);
        break;
    }
  };

  const createTaskErrorHandler = (err: AppError) => {
    commonSwitchCase(err);
  };

  const delTaskByNameErrHadler = (err: AppError) => {
    commonSwitchCase(err);
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
    authErrorHandler,
    signUpErrorHandler,
    activeTaskErrorHandler,
    createTaskErrorHandler,
    delTaskByNameErrHadler,
    delTaskByIdErrHadler,
    updTaskByNameErrHadler,
    updTaskByIdErrHadler,
  };
}
