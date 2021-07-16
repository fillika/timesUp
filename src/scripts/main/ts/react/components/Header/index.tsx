import React, { useCallback, useEffect } from 'react';
import playBtn from 'Images/icons/play.svg';
import stopBtn from 'Images/icons/stop-button.svg';
import { useHeader } from './hooks/useHeader';
import { HeaderInput } from './component/HeaderInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { getActiveTask } from './utils/getActiveTask';
import { taskHandler } from 'Utils/TaskHandler';
import { createTask } from './utils/createTask';
import { time } from 'Utils/Time';

const Header: React.FC = () => {
  // const {
  //   onInput,
  //   toggleTimer,
  //   onKeyPress,
  //   activeTask: { name, isTimeActive, totalTime },
  // } = useHeader();

  const dispatch = useDispatch();

  const {
    activeTask,
    app: { token },
  } = useSelector((state: RootState) => state);
  const { activeTaskErrorHandler, createTaskErrorHandler } = useGlobalError();

  console.log('Render[Header]');

  useEffect(() => {
    if (token) {
      getActiveTask(activeTaskErrorHandler, token, dispatch);
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (activeTask.isTimeActive) {
        taskHandler.updateActiveTask(token, activeTask);
      }
    }
  }, [activeTask.isTimeActive]);

  useEffect(() => {
    if (activeTask.duration > 0 && token) {
      createTask(createTaskErrorHandler, activeTask, dispatch, token);
      dispatch({ type: 'RESET_ACTIVE_TASK_PROPS', payload: { totalTime: '00:00:00', name: '', duration: 0 } });
      document.title = `TimesUp`;
    }
  }, [activeTask.duration]);

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (activeTask.isTimeActive) {
        const diff = new Date().getTime() - new Date(activeTask.start).getTime();
        const totalTime = time.countTotalTime(diff);
        dispatch({ type: 'SET_ACTIVE_TASK_TOTAL_TIME', payload: totalTime });

        document.title = `${totalTime} - ${activeTask.name}`;
      } else {
        clearTimeout(timeoutID);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, [activeTask.isTimeActive, activeTask.totalTime]);

  const toggleTimer = () => token && taskHandler.toggleTimer(activeTask, dispatch, token);

  const testFn = useCallback(() => console.log('hello'), []);

  return (
    <header className='header'>
      <HeaderInput toggleTimer={testFn} name={activeTask.name} isTimeActive={activeTask.isTimeActive} />

      <div className='header__panel header-panel'>
        <div>
          <div>{activeTask.totalTime}</div>
        </div>
        <div className='header__button-wrapper'>
          <button onClick={toggleTimer} className='header__button header__button--play'>
            <img src={!activeTask.isTimeActive ? playBtn : stopBtn} alt='Иконка' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
