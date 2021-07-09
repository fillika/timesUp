import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, FormikProps } from 'formik';
import { FormikData, formikKeyType, LogInValues } from './hooks/useFormikLogIn';
import { FormikError } from './../FormikError';


export const LogInForm: React.FC<{ formik: FormikProps<LogInValues>, data: FormikData }> = ({ formik, data }) => {
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

      <div>
        <Link to='/forgotPassword/123'>Forgot your password?</Link>
      </div>

      <div className='form__button-wrapper'>
        <button className={`button button--success`} type='submit'>
          Войти
        </button>
      </div>
    </Form>
  );
};
