import React from 'react';
import { FormikHOC } from 'App/components/FormikWrapper';
import { useFormikState } from './hooks/useFormikState';

export const UpdatePassword = () => {
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
        <button className='button button--success' type='submit'>
          Создать новый пароль
        </button>
      </div>
    </FormikHOC>
  );
};
