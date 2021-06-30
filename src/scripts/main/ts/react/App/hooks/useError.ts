import { useDispatch } from 'react-redux';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Utils/helpers/createNotify';

export function useError() {
  const dispatch = useDispatch();
  let message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

  const errHandler = (err: AppError) => {
    switch (err.statusCode) {
      case 401:
        message = 'Пожалуйста, залогиньтесь заново';
        createNotify('warning', message, dispatch);
        break;
      case 404:
        message = 'Ошибка подключения к серверу. Приносим свои извинения :(';
        createNotify('error', message, dispatch);
        break;
    
      default:
        break;
    }

    dispatch({ type: 'APP_LOG_OUT' });
  };

  return [errHandler];
}
