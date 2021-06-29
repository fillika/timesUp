import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';
import { Preloader } from 'App/components/Preloader/index';
import { RootState } from 'Redux/rootReducer';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { AppError } from 'Utils/Error';

const App: React.FC = () => {
  const { isLoggin, isLoading } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  // Todo - доработать обрабочик ошибок
  const errHadler = (err: AppError) => {
    if (err.statusCode === 404) {
      console.log('Ошибка подключения к серверу. Приносим свои извинения :(');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('JWT');

    if (token) {
      getAllTasks(errHadler, token, dispatch);
    } else {
      dispatch({ type: 'APP_LOG_OUT' });
    }
  }, []);

  if (isLoading) return <Preloader />;

  return <div className='timer'>{isLoggin ? <IsLogged /> : <Greetings />}</div>;
};

export default App;
