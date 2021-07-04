import React from 'react';
import { Form, Field, FormikProps } from 'formik';
import { formikKeyType, FormikSignUpValues } from './hooks/useFormikSignUp';
import { FormikError } from './../FormikError';

export const SignUpForm: React.FC<{ formik: FormikProps<FormikSignUpValues> }> = ({ formik }) => {
  const data = {
    labels: {
      name: 'Username',
      email: 'Email',
      password: 'Password',
      passwordConfirm: 'Confirm password',
    },
    types: {
      name: 'text',
      email: 'email',
      password: 'password',
      passwordConfirm: 'password',
    },
  };

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
          Зарегистрироваться
        </button>
      </div>
    </Form>
  );
};
