import React from 'react';
import { FormikHOC } from 'App/components/FormikWrapper';
import { Link } from 'react-router-dom';
import { useFormikState } from './hooks/useFormikState';

export const ResetPassword = () => {
  const [initialValues, validationSchema, data, onSubmit] = useFormikState();

  const config = {
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
  };

  return (
    <FormikHOC data={data} config={config}>
      <div className='form__button-wrapper'>
        <Link className='button button--primary' to='/'>
          Назад
        </Link>
        <button className='button button--secondary' type='submit'>
          Сбросить пароль
        </button>
      </div>
    </FormikHOC>
  );
};
