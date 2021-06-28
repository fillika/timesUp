import React, { Dispatch, useEffect } from 'react';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/index';
import taskAPI from 'Api/tasks';
import { sort } from 'Utils/Sort';

const firstConnect = async (dispatch: Dispatch<any>, token: string) => {
  try {
    const response = await taskAPI.getAllTask(token);
    const tasks = sort.sortData(response.data.tasks);
    dispatch({ type: 'GET_ALL_TASKS', payload: tasks });
    dispatch({ type: 'APP_LOG_IN', payload: token });
  } catch (error) {
    // Todo обработать ошибки
    console.error(error);
    dispatch({ type: 'GET_ALL_TASKS', payload: [] });
  }
};

const App: React.FC = () => {
  // Todo брать из state
  const { isLoggin } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) firstConnect(dispatch, token);
    else dispatch({ type: 'APP_LOG_OUT' });
  }, []);

  if (isLoggin === null) {
    // Todo preloader
    return null;
  }

  return <div className='timer'>{isLoggin ? <IsLogged /> : <Greetings />}</div>;
};

export default App;
