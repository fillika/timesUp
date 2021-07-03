import React from 'react';
import { Form, Field, ErrorMessage, FormikProps } from 'formik';
import { formikKeyType, LogInValues } from './hooks/useFormikLogIn';

export const LogInForm: React.FC<{ formik: FormikProps<LogInValues> }> = ({ formik }) => {
  return (
    <Form onSubmit={formik.handleSubmit} className='form'>
      {Object.keys(formik.values).map(formikKey => (
        <div
          key={formikKey}
          className={`form__fields-wrapper ${formik.errors[formikKey as formikKeyType] ? 'error' : ''}`}>
          <Field type={formikKey} name={formikKey} id={formikKey} />
          <label htmlFor={formikKey}>{formikKey.replace(formikKey[0], formikKey[0].toUpperCase())}</label>
          {formik.errors[formikKey as formikKeyType] ? (
            <div className='form__error'>
              <ErrorMessage name={formikKey} />
            </div>
          ) : null}
        </div>
      ))}

      <div className='form__button-wrapper'>
        <button className={`button button--success`} type='submit'>
          Войти
        </button>
      </div>
    </Form>
  );
};
