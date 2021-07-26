import React from 'react';
import { FormikHOC } from 'App/components/FormikWrapper';
import { useHistory } from 'react-router-dom';
import { useFormikState } from './hooks/useFormikState';
import { EmailSendedMessage } from './components/EmailSendedMessage/index';
import Button from '@material-ui/core/Button';

export const ResetPassword = () => {
  const [status, initialValues, validationSchema, data, onSubmit, isMailSended] = useFormikState();
  const history = useHistory();

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
            <Button color='primary' variant='contained' onClick={() => history.push('/')}>
              Назад
            </Button>
            <Button color='secondary' variant='contained' disabled={status} type='submit'>
              Сбросить пароль
            </Button>
          </div>
        </FormikHOC>
      )}
    </>
  );
};
