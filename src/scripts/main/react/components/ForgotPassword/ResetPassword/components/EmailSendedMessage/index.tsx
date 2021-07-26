import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

export const EmailSendedMessage = () => {
  const history = useHistory();

  return (
    <div>
      <p style={{ marginBottom: 10 }}>
        На вашу почту было отправлено письмо. Чтобы продолжить процедуру восстановления пароля пройдите по ссылке в
        письме.
      </p>
      <p>
        <Button onClick={() => history.push('/')} color='primary' variant='contained'>
          Понятно
        </Button>
      </p>
    </div>
  );
};
