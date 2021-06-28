import React, { Dispatch, useEffect } from 'react';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/index';
import { getAllTasks } from 'Utils/helpers/getAllTasks';

const App: React.FC = () => {
  // Todo брать из state
  const { isLoggin } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      getAllTasks(token, dispatch);
    } else {
      dispatch({ type: 'APP_LOG_OUT' });
    }
  }, []);

  if (isLoggin === null) {
    return <>Здесь null (будет прелоадер)</>;
  }

  return <div className='timer'>{isLoggin ? <IsLogged /> : <Greetings />}</div>;
};

export default App;
