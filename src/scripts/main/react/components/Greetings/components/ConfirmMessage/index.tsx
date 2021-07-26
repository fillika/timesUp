import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const ConfirmMessage = () => {
  const history = useHistory();
  const toHome = () => history.push('/');
  
  return (
    <div>
      <p style={{ marginBottom: 10 }}>На вашу почту было отправлено письмо с инструкцией для завершения регистрации.</p>
      <p>
        <Button onClick={toHome} variant='contained' color='default'>
          Понятно
        </Button>
      </p>
    </div>
  );
};
