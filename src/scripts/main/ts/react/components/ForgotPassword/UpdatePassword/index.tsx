import React from 'react';
import { FormikHOC } from 'App/components/FormikWrapper';
import { useFormikState } from './hooks/useFormikState';
import Button from '@material-ui/core/Button';

export const UpdatePassword = () => {
  const [status, initialValues, validationSchema, data, onSubmit] = useFormikState();

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
        <Button color='secondary' variant='contained' type='submit' disabled={status}>
          Создать новый пароль
        </Button>
      </div>
    </FormikHOC>
  );
};
