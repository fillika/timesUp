import { AppError } from 'Utils/Error';
import { Dispatch } from 'react';
import { notifyWarning, notifyError } from 'Redux/reducers/notifyReducer/actionCreators';

export const errSwitchCase = (err: AppError, dispatch: Dispatch<any>) => {
  let message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

  switch (err.statusCode) {
    case 401:
      message = 'Пожалуйста, залогиньтесь заново';
      dispatch(notifyWarning(message));
      localStorage.removeItem('JWT');
      break;
    case 404:
      dispatch(notifyError(message));
      break;
    case 500:
      dispatch(notifyError(`Ошибка сервера: ${err.message}`));
      break;
    default:
      dispatch(notifyError(err.message));
      break;
  }
};
