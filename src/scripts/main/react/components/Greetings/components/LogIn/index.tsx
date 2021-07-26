import React from 'react';
import { useLogInState } from './hooks/useLogInState';
import { useFormikLogIn } from './hooks/useFormikLogIn';
import { FormikHOC } from 'App/components/FormikWrapper';
import { Link } from 'react-router-dom';
import { ConfirmMessage } from '../ConfirmMessage';
import Button from '@material-ui/core/Button';
import { useStyles } from './hooks/useStyles';

export const LogIn = () => {
  const [initialValues, validationSchema, data] = useFormikLogIn();
  const [status, asyncStatus, onSubmit] = useLogInState();
  const classes = useStyles();

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
        <Button className={classes.button} variant='contained' disabled={status} type='submit'>
          Войти
        </Button>
      </div>
    </FormikHOC>
  );
};
