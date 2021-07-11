import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from 'Api/auth';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Utils/helpers/createNotify';

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

type HookState = [FormikValues, any, FormikData, (values: FormikValues) => void];

export const useFormikState = (): HookState => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  console.log(id);

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

  const sendReq = asyncCatcher(async (values: FormikValues, dispatch: Dispatch<any>) => {
    const { password, passwordConfirm } = values;
    const response = await authAPI.updatePassword({ id, password, passwordConfirm });

    if (response.status === 'success') {
      dispatch({ type: 'APP_LOG_IN', payload: response.data.token });
      createNotify('success', 'Ваш пароль изменен.\nДобро пожаловать!', dispatch);
    }
  });

  const errHandler = (err: AppError) => {
    let message = 'Ошибка по умолчанию!';

    switch (err.statusCode) {
      case 404:
        message = 'Такого email не существует';
        createNotify('error', message, dispatch);
        break;

      default:
        createNotify('error', err.message, dispatch);
        break;
    }
  };

  const onSubmit = (values: FormikValues) => {
    sendReq(errHandler, values, dispatch);
  };

  return [initialValues, validationSchema, data, onSubmit];
};
