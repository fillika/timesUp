import React from 'react';
import * as Yup from 'yup';
import { useParams, Link } from 'react-router-dom';
import { FormikHOC } from 'App/components/FormikWrapper';

export type FormikValues = {
  email: string;
};

export type formikKeyType = keyof FormikValues;

export type FormikData = {
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: string;
  };
};

export const ForgotPassword: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const initialValues: FormikValues = {
    email: '',
  };

  const data = {
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

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  const config = {
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  };

  return (
    <div className='formWrapper'>
      <FormikHOC data={data} config={config}>
        <div className='form__button-wrapper'>
          <Link className='button button--primary' to='/'>
            Назад
          </Link>
          <button className='button button--secondary' type='submit'>
            Сбросить пароль
          </button>
        </div>
      </FormikHOC>
    </div>
  );
};
