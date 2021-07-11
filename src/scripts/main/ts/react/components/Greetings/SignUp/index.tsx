import React from 'react';
import { Formik } from 'formik';
import { SignUpForm } from './SignUpForm';
import * as Yup from 'yup';
import { useFormikSignUp } from './hooks/useFormikSignUp';
import { useSignUpState } from './hooks/useSignUpState';

export const SignUp = () => {
  const [initialValues, validationSchema, data] = useFormikSignUp();
  const [onSubmit] = useSignUpState();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      >
      {formik => <SignUpForm formik={formik} data={data} />}
    </Formik>
  );
};
