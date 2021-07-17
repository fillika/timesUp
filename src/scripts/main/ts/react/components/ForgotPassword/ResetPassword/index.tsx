import React from 'react';
import { FormikHOC } from 'App/components/FormikWrapper';
import { Link } from 'react-router-dom';
import { useFormikState } from './hooks/useFormikState';

const EmailSendedMessage = () => (
  <div>
    <p style={{ marginBottom: 10 }}>
      На вашу почту было отправлено письмо. Чтобы продолжить процедуру восстановления пароля пройдите по ссылке в
      письме.
    </p>
    <p>
      <Link to='/' className='button button--secondary'>
         Понятно
      </Link>
    </p>
  </div>
);

export const ResetPassword = () => {
  const [status, initialValues, validationSchema, data, onSubmit, isMailSended] = useFormikState();

  const config = {
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  };

  return (
    <>
      {isMailSended ? (
        <EmailSendedMessage />
      ) : (
        <FormikHOC data={data} config={config}>
          <div className='form__button-wrapper'>
            <Link className='button button--primary' to='/'>
              Назад
            </Link>
            <button className='button button--secondary' type='submit' disabled={status}>
              Сбросить пароль
            </button>
          </div>
        </FormikHOC>
      )}
    </>
  );
};
