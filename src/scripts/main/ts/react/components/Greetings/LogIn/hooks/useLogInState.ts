import { Dispatch } from 'react';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { authAPI } from 'Api/auth';
import { useDispatch } from 'react-redux';
import { LogInValues } from './useFormikLogIn';
import { FormikHelpers } from 'formik';
import { useStatusState } from 'App/hooks/useStatusState';
import { AppError } from 'Utils/Error';

export const useLogInState = (): [
  boolean,
  (values: LogInValues, formikHelpers: FormikHelpers<LogInValues>) => void
] => {
  const { getTasksErrorHandlerErr } = useGlobalError();
  const dispatch = useDispatch();
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' ? true : false;

  const logIn = asyncCatcher(async (values: LogInValues, dispatch: Dispatch<any>) => {
    const response = await authAPI.logIn(values);

    if (response.status === 'success') {
      const token = response.data.token;
      createNotify('success', 'Добро пожаловать!', dispatch);
      getAllTasks(getTasksErrorHandlerErr, token, dispatch);
    }

    // * Не уверен, что до этого куска кода доходит код
    if (response.status === 'fail') {
      localStorage.removeItem('JWT');
      createNotify('error', response.message, dispatch);
    }
  });

  const authErrorHandler = (err: AppError) => {
    setStatus('error');
    let message = '';

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

  const onSubmit = (values: LogInValues, formikHelpers: FormikHelpers<LogInValues>) => {
    setStatus('pending');
    logIn(authErrorHandler, values, dispatch);
  };

  return [statusState, onSubmit];
};
