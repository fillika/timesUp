import React from 'react';
import { useFormikSignUp } from './hooks/useFormikSignUp';
import { useSignUpState } from './hooks/useSignUpState';
import { FormikHOC } from 'App/components/FormikWrapper';
import { ConfirmMessage } from '../ConfirmMessage/index';
import Button from '@material-ui/core/Button';

export const SignUp = () => {
  const [initialValues, validationSchema, data] = useFormikSignUp();
  const [status, asyncStatus, onSubmit] = useSignUpState();

  const config = {
    initialValues,
    onSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
  };

  if (asyncStatus === 'success') {
    return <ConfirmMessage />;
  }
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
        <Button color='primary' variant='contained' disabled={status} type="submit">
          Зарегистрироваться
        </Button>
      </div>
    </FormikHOC>
  );
};
