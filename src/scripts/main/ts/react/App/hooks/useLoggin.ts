import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { useError } from './useError';

export function useLoggin(): [boolean | null, boolean] {
  const { isLoggin, isLoading } = useSelector((state: RootState) => state.app);
  const [errHandler] = useError();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      getAllTasks(errHandler, token, dispatch);
    } else {
      dispatch({ type: 'APP_LOG_OUT' });
    }
  }, []);

  return [isLoggin, isLoading];
}
