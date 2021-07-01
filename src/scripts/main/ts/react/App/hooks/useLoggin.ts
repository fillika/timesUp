import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { useGlobalError } from 'App/hooks/useGlobalError';

export function useLoggin(): [boolean | null, boolean] {
  const { isLoggin, isLoading } = useSelector((state: RootState) => state.app);
  const { getTasksErrorHandlerErr } = useGlobalError();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      getAllTasks(getTasksErrorHandlerErr, token, dispatch);
    } else {
      dispatch({ type: 'APP_LOG_OUT' });
    }
  }, []);

  return [isLoggin, isLoading];
}
