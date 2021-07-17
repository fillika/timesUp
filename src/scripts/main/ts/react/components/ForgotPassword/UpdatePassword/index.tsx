import React from 'react';
import { FormikHOC } from 'App/components/FormikWrapper';
import { useFormikState } from './hooks/useFormikState';

export const UpdatePassword = () => {
  const [isError, initialValues, validationSchema, data, onSubmit] = useFormikState();

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
        <button className='button button--success' type='submit' disabled={isError}>
          Создать новый пароль
        </button>
      </div>
    </FormikHOC>
  );
};
