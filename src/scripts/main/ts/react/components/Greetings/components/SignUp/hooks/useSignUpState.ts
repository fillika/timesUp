import { Dispatch } from 'react';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { authAPI } from 'Api/auth';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { FormikSignUpValues } from './useFormikSignUp';
import { useDispatch } from 'react-redux';
import { AppError } from 'Utils/Error';
import { useStatusState } from 'App/hooks/useStatusState';
import { asyncStatus } from 'Types/async';

export const useSignUpState = (): [boolean, asyncStatus, (values: FormikSignUpValues) => void] => {
  const dispatch = useDispatch();
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' ? true : false;

  const signUp = asyncCatcher(async (values: FormikSignUpValues, dispatch: Dispatch<any>) => {
    const captchaResult = await grecaptcha
      .execute('6LcRiXcbAAAAAI2l3coT8LIawOX3B-IhNRAmmQin', { action: 'registration' })
      .then((token: string) => {
        return {
          token: token,
        };
      });

    const response = await authAPI.signUp({ ...values, ...captchaResult });

    switch (response.status) {
      case 'success':
        setStatus('success');
        break;
      case 'fail':
        setStatus('error');
        localStorage.removeItem('JWT');
        dispatch(createNotify('error', response.message));
        break;

      default:
        break;
    }
  });

  const signUpErrorHandler = (err: AppError) => {
    setStatus('error');
    let message = '';
    switch (err.statusCode) {
      case 400:
        dispatch(createNotify('error', err.message));

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

  const onSubmit = (values: FormikSignUpValues) => {
    setStatus('pending');
    signUp(signUpErrorHandler, values, dispatch);
  };

  return [statusState, status, onSubmit];
};
