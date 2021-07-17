import { createNotify } from 'Utils/helpers/createNotify';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { authAPI } from 'Api/auth';
import { useDispatch } from 'react-redux';
import { LogInValues } from './useFormikLogIn';
import { FormikHelpers } from 'formik';
import { useStatusState } from 'App/hooks/useStatusState';
import { AppError } from 'Utils/Error';
import { asyncStatus } from 'Types/async';

export const useLogInState = (): [
  boolean,
  asyncStatus,
  (values: LogInValues, formikHelpers: FormikHelpers<LogInValues>) => void
] => {
  const dispatch = useDispatch();
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' ? true : false;

  const logIn = asyncCatcher(async (values: LogInValues) => {
    await authAPI.logIn(values);
    setStatus('success');
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
        message = 'Такой email не существует';
        createNotify('error', err.message, dispatch);
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

  return [statusState, status, onSubmit];
};