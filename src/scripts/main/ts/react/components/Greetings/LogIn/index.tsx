import React from 'react';
import { useLogInState } from './hooks/useLogInState';
import { useFormikLogIn } from './hooks/useFormikLogIn';
import { FormikHOC } from 'App/components/FormikWrapper';
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
    <FormikHOC data={data} config={config}>
      <div>
        <Link to='/forgotPassword' className="form__link form__link--forgot-password">I forgot my password :(</Link>
      </div>

      <div className='form__button-wrapper'>
        <button className={`button button--success`} type='submit'>
          Войти
        </button>
      </div>
    </FormikHOC>
  );
};
