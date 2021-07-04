import React from 'react';
import { Formik } from 'formik';
import { useLogInState } from './hooks/useLogInState';
import { LogInForm } from './LogInForm';
import { useFormikLogIn } from './hooks/useFormikLogIn';

export const LogIn = () => {
  const [initialValues, validationSchema, data] = useFormikLogIn();
  const [onSubmit] = useLogInState();
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}>
      {formik => <LogInForm formik={formik} data={data} />}
    </Formik>
  );
};
