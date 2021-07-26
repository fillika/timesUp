import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { authAPI } from 'Scripts/main/api/auth';
import { useDispatch } from 'react-redux';
import { LogInValues } from './useFormikLogIn';
import { FormikHelpers } from 'formik';
import { useStatusState } from 'App/hooks/useStatusState';
import { AppError } from 'Utils/Error';
import { asyncStatus } from 'Types/async';
import { getAllTasks } from 'Utils/helpers/getAllTasks';

export const useLogInState = (): [
  boolean,
  asyncStatus,
  (values: LogInValues, formikHelpers: FormikHelpers<LogInValues>) => void
] => {
  const dispatch = useDispatch();
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' ? true : false;

  const logIn = asyncCatcher(async (values: LogInValues) => {
    const response = await authAPI.logIn(values);

    if (response === null) {
      return setStatus('success');
    }

    dispatch(createNotify('success', 'Добро пожаловать!'));
    dispatch(getAllTasks(response.data.token));
  });

  const authErrorHandler = (err: AppError) => {
    setStatus('error');
    let message = '';

    switch (err.statusCode) {
      case 401:
        message = 'Неверный логин или пароль';
        dispatch(createNotify('error', message));

        break;
      case 404:
        message = 'Такой email не существует';
        dispatch(createNotify('error', err.message));
        break;

      default:
        dispatch(createNotify('error', err.message));
        break;
    }
  };

  const onSubmit = (values: LogInValues, formikHelpers: FormikHelpers<LogInValues>) => {
    setStatus('pending');
    logIn(authErrorHandler, values, dispatch);
  };

  return [statusState, status, onSubmit];
};
