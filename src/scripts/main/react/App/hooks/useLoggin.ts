import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { logOut } from 'Redux/reducers/appReducer/actionCreator';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { getJWTToken } from 'Utils/helpers/JWTHadlers';

export function useLoggin(): [boolean | null, boolean] {
  const { isLoggin, isLoading } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getJWTToken();

    if (token) {
      dispatch(getAllTasks(token));
      return;
    }

    dispatch(logOut());
  }, []);

  return [isLoggin, isLoading];
}
