import { useDispatch } from 'react-redux';
import { AppError } from 'Utils/Error';
import { createNotify } from 'Utils/helpers/createNotify';

export function useError() {
  const dispatch = useDispatch();
  const message = 'Ошибка подключения к серверу. Приносим свои извинения :(';

  const errHandler = (err: AppError) => {
    if (err.statusCode === 404) {
      dispatch({ type: 'APP_LOG_OUT' });
      createNotify('error', message, dispatch);
    }
  };

  return [errHandler];
}
