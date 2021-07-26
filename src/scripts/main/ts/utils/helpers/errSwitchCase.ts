import { AppError } from 'Utils/Error';
import { Dispatch } from 'react';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';

export const errSwitchCase = (err: AppError, dispatch: Dispatch<any>) => {
  let message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

  switch (err.statusCode) {
    case 401:
      message = 'Пожалуйста, залогиньтесь заново';
      dispatch(createNotify('warning', message));
      localStorage.removeItem('JWT');
      break;
    case 404:
      dispatch(createNotify('error', message));
      break;
    case 500:
      dispatch(createNotify('error', `Ошибка сервера: ${err.message}`));
      break;
    default:
      dispatch(createNotify('error', err.message));
      break;
  }
};
