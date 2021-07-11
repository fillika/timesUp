import * as Yup from 'yup';
import { authAPI } from 'Api/auth';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { useDispatch } from 'react-redux';
import { Dispatch, useState } from 'react';
import { createNotify } from 'Utils/helpers/createNotify';
import { AppError } from 'Utils/Error';

type FormikValues = {
  email: string;
};

type FormikData = {
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: string;
  };
};

type HookState = [FormikValues, any, FormikData, (values: FormikValues) => void, boolean];

export const useFormikState = (): HookState => {
  const dispatch = useDispatch();
  const [isMailSended, setMailSended] = useState(false);

  const initialValues: FormikValues = {
    email: '',
  };

  const data: FormikData = {
    labels: {
      email: 'Email',
    },
    types: {
      email: 'email',
    },
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const sendReq = asyncCatcher(async (values: FormikValues, dispatch: Dispatch<any>) => {
    const { email } = values;
    const response = await authAPI.forgotPassword({ email });

    if (response.status === 'success') {
      console.log(response.data.id);
      setMailSended(true);
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

  const onSubmit = async (values: FormikValues) => {
    sendReq(errHandler, values, dispatch);
  };

  return [initialValues, validationSchema, data, onSubmit, isMailSended];
};
