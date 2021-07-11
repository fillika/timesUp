import React from 'react';
import { useLogInState } from './hooks/useLogInState';
import { useFormikLogIn } from './hooks/useFormikLogIn';
import { FormikWrapper } from 'App/components/FormikWrapper';
import { Link } from 'react-router-dom';

export const LogIn = () => {
  const [initialValues, validationSchema, data] = useFormikLogIn();
  const [onSubmit] = useLogInState();

  const config = {
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  };

  return (
    <FormikWrapper data={data} config={config}>
      <div>
        <Link to='/forgotPassword/123'>Forgot your password?</Link>
      </div>

      <div className='form__button-wrapper'>
        <button className={`button button--success`} type='submit'>
          Войти
        </button>
      </div>
    </FormikWrapper>
  );
};
