import React from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, FormikProps } from 'formik';
import { FormikError } from 'App/components/Greetings/FormikError';

export type FormikValues = {
  email: string;
  password: string;
  passwordConfirm: string;
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

export const ForgotPassword: React.FC<{ formik: FormikProps<FormikValues>; data: FormikData }> = ({ formik }) => {
  const { id } = useParams<{ id: string }>();
  const initialValues: FormikValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const data = {
    labels: {
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm password',
    },
    types: {
      email: 'email',
      password: 'password',
      passwordConfirm: 'password',
    },
  };

  const validationSchema = {
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Must be 8 characters or less'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Both passwords need to be the same')
      .required('Please, confirm your password'),
  };

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}>
      {formik => {
        return (
          <Form onSubmit={formik.handleSubmit} className='form'>
            {Object.keys(formik.values).map(formikKey => {
              const type = data.types[formikKey as formikKeyType];
              const labelText = data.labels[formikKey as formikKeyType];

              return (
                <div
                  key={formikKey}
                  className={`form__fields-wrapper ${formik.errors[formikKey as formikKeyType] ? 'error' : ''}`}>
                  <Field type={type} name={formikKey} id={formikKey} />
                  <label htmlFor={formikKey}>{labelText}</label>
                  {formik.errors[formikKey as formikKeyType] ? <FormikError formikKey={formikKey} /> : null}
                </div>
              );
            })}

            <div className='form__button-wrapper'>
              <button className='button button--primary' type='submit'>
                Сбросить пароль
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
