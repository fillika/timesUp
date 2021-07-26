import * as Yup from 'yup';
import { authAPI } from 'Scripts/main/api/auth';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { useDispatch } from 'react-redux';
import { Dispatch, useState } from 'react';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';
import { AppError } from 'Utils/Error';
import { useStatusState } from 'App/hooks/useStatusState';

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

type HookState = [boolean, FormikValues, any, FormikData, (values: FormikValues) => void, boolean];

export const useFormikState = (): HookState => {
  const dispatch = useDispatch();
  const [isMailSended, setMailSended] = useState(false);
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' ? true : false;

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

  const resetPassword = asyncCatcher(async (values: FormikValues, dispatch: Dispatch<any>) => {
    const { email } = values;
    await authAPI.forgotPassword({ email });

    setMailSended(true);
    setStatus('success');
  });

  const errHandler = (err: AppError) => {
    setStatus('error');
    let message = 'Ошибка по умолчанию!';

    switch (err.statusCode) {
      case 404:
        message = 'Такого email не существует';
        dispatch(createNotify('error', message));
        break;

      default:
        dispatch(createNotify('error', err.message));
        break;
    }
  };

  const onSubmit = async (values: FormikValues) => {
    setStatus('pending');
    resetPassword(errHandler, values, dispatch);
  };

  return [statusState, initialValues, validationSchema, data, onSubmit, isMailSended];
};
