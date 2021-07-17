import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { Dispatch, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from 'Api/auth';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Utils/helpers/createNotify';
import { useStatusState } from 'App/hooks/useStatusState';

type FormikValues = {
  password: string;
  passwordConfirm: string;
};

type FormikData = {
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: string;
  };
};

type HookState = [boolean, FormikValues, any, FormikData, (values: FormikValues) => void];

export const useFormikState = (): HookState => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' || status === 'error' ? true : false 

  const initialValues: FormikValues = {
    password: '',
    passwordConfirm: '',
  };

  const data = {
    labels: {
      password: 'Password',
      passwordConfirm: 'Confirm password',
    },
    types: {
      password: 'password',
      passwordConfirm: 'password',
    },
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Both passwords need to be the same')
      .required('Please, confirm your password'),
  });

  const updatePassword = asyncCatcher(async (values: FormikValues, dispatch: Dispatch<any>) => {
    setStatus('pending');
    const { password, passwordConfirm } = values;
    const response = await authAPI.updatePassword({ id, password, passwordConfirm });

    dispatch({ type: 'APP_LOG_IN', payload: response.data.token });
    createNotify('success', 'Ваш пароль изменен.\nДобро пожаловать!', dispatch);
    setStatus('success');
  });

  const errHandler = (err: AppError) => {
    setStatus('error');
    let message = 'Ошибка по умолчанию!';

    switch (err.statusCode) {
      case 401:
        message = 'Время действия ссылки истекло. Попробуйте еще раз!';
        createNotify('error', message, dispatch, 3000);
        setTimeout(() => history.push('/'), 3000);
        break;

      default:
        createNotify('error', err.message, dispatch);
        break;
    }
  };

  const onSubmit = (values: FormikValues) => updatePassword(errHandler, values, dispatch);

  return [statusState, initialValues, validationSchema, data, onSubmit];
};
