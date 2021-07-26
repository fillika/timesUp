import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { getAllTasks } from 'Utils/helpers/getAllTasks';

export function useLoggin(): [boolean | null, boolean] {
  const { isLoggin, isLoading } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      dispatch(getAllTasks(token));
      return;
    }

    dispatch({ type: 'APP_LOG_OUT' });
  }, []);

  return [isLoggin, isLoading];
}
