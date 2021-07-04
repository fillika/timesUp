import React from 'react';
import { Form, Field, ErrorMessage, FormikProps } from 'formik';
import { formikKeyType, FormikSignUpValues } from './hooks/useFormikSignUp';

export const SignUpForm: React.FC<{ formik: FormikProps<FormikSignUpValues> }> = ({ formik }) => {
  const toUpperCase = (str: string) => str.replace(str[0], str[0].toUpperCase());

  return (
    <Form onSubmit={formik.handleSubmit} className='form'>
      {Object.keys(formik.values).map(formikKey => (
        <div
          key={formikKey}
          className={`form__fields-wrapper ${formik.errors[formikKey as formikKeyType] ? 'error' : ''}`}>
          <Field type={formikKey} name={formikKey} id={formikKey} />
          <label htmlFor={formikKey}>{toUpperCase(formikKey)}</label>
          {formik.errors[formikKey as formikKeyType] ? (
            <div className='form__error'>
              <ErrorMessage name={formikKey} />
            </div>
          ) : null}
        </div>
      ))}

      <div className='form__button-wrapper'>
        <button className={`button button--primary`} type='submit'>
          Зарегистрироваться
        </button>
      </div>
    </Form>
  );
};
