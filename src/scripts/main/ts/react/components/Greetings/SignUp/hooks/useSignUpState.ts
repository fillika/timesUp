import { Dispatch } from 'react';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { authAPI } from 'Api/auth';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { FormikSignUpValues } from './useFormikSignUp';
import { useDispatch } from 'react-redux';

export const useSignUpState = (): [(values: FormikSignUpValues) => void] => {
  const { getTasksErrorHandlerErr, signUpErrorHandler } = useGlobalError();
  const dispatch = useDispatch();

  const signUp = asyncCatcher(async (values: FormikSignUpValues, dispatch: Dispatch<any>) => {
    const response = await authAPI.signUp(values);

    switch (response.status) {
      case 'success':
        const token = response.data.token;
        localStorage.setItem('JWT', token);
        createNotify('success', 'Добро пожаловать!', dispatch);
        getAllTasks(getTasksErrorHandlerErr, token, dispatch);
        break;
      case 'fail':
        localStorage.removeItem('JWT');
        createNotify('error', response.message, dispatch);
        break;

      default:
        break;
    }
  });

  const onSubmit = (values: FormikSignUpValues) => {
    signUp(signUpErrorHandler, values, dispatch);
  };

  return [onSubmit];
};
