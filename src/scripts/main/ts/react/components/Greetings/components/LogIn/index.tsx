import React from 'react';
import { useLogInState } from './hooks/useLogInState';
import { useFormikLogIn } from './hooks/useFormikLogIn';
import { FormikHOC } from 'App/components/FormikWrapper';
import { Link } from 'react-router-dom';
import { ConfirmMessage } from '../ConfirmMessage';

export const LogIn = () => {
  const [initialValues, validationSchema, data] = useFormikLogIn();
  const [status, asyncStatus, onSubmit] = useLogInState();

  const config = {
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  };

  if (asyncStatus === 'success') {
    return <ConfirmMessage />;
  }

  return (
    <FormikHOC data={data} config={config}>
      <div>
        <Link to='/forgotPassword' className='form__link form__link--forgot-password'>
          I forgot my password :(
        </Link>
      </div>

      <div className='form__button-wrapper'>
        <button className={`button button--success`} type='submit' disabled={status}>
          Войти
        </button>
      </div>
    </FormikHOC>
  );
};
