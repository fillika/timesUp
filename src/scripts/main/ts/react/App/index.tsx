import React, { useEffect } from 'react';
import IsLogged from 'App/components/isLogged';
import Greetings from 'App/components/Greetings';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/index';

const App: React.FC = () => {
  // Todo брать из state
  const { isLoggin } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    // Todo запрос к серверу и вывод сообщений для пользователя
    // dispatch({ type: 'APP_SET_IS_LOGGIN', payload: true });
  }, []);

  return <div className='timer'>{isLoggin ? <IsLogged /> : <Greetings />}</div>;
};

export default App;
