import { Dispatch } from 'react';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { authAPI } from 'Api/auth';
import { useDispatch } from 'react-redux';
import { LogInValues, useFormikLogIn } from './useFormikLogIn';

export const useLogInState = (): [(values: LogInValues) => void] => {
  const { getTasksErrorHandlerErr, authErrorHandler } = useGlobalError();
  const dispatch = useDispatch();

  const logIn = asyncCatcher(async (values: LogInValues, dispatch: Dispatch<any>) => {
    const response = await authAPI.logIn(values);

    if (response.status === 'success') {
      const token = response.data.token;
      localStorage.setItem('JWT', token);
      dispatch({type: ''});
      createNotify('success', 'Добро пожаловать!', dispatch);
      getAllTasks(getTasksErrorHandlerErr, token, dispatch);
    }

    if (response.status === 'fail') {
      localStorage.removeItem('JWT');
      createNotify('error', response.message, dispatch);
    }
  });

  const onSubmit = (values: LogInValues) => {
    logIn(authErrorHandler, values, dispatch);
  };

  return [onSubmit];
};
