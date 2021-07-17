import React from 'react';
import { useFormikSignUp } from './hooks/useFormikSignUp';
import { useSignUpState } from './hooks/useSignUpState';
import { FormikHOC } from 'App/components/FormikWrapper';

export const SignUp = () => {
  const [initialValues, validationSchema, data] = useFormikSignUp();
  const [status, onSubmit] = useSignUpState();

  const config = {
    initialValues,
    onSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  };

  return (
    <FormikHOC data={data} config={config}>
      <div className='form__policy'>
        This site is protected by reCAPTCHA and the Google{' '}
        <a href='https://policies.google.com/privacy' rel='noreferrer' target='_blank'>
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href='https://policies.google.com/terms' rel='noreferrer' target='_blank'>
          Terms of Service
        </a>{' '}
        apply.
      </div>
      <div className='form__button-wrapper'>
        <button className='button button--primary' type='submit' disabled={status}>
          Зарегистрироваться
        </button>
      </div>
    </FormikHOC>
  );
};
