import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../store/index';
import Task from './Task/Task';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);

  const url = 'http://localhost:22222/api/v1/tasks';

  useEffect(() => {
    const result = async () => {
      try {
        const response = await getData(url);
        dispatch({ type: 'ADD_TASKS', payload: response.data.tasks });
      } catch (error) {
        console.error(error);
      }
    };

    result();
  }, [taskArr]);

  return (
    <main className='main'>
      <ul className='task-list'>
        {taskArr.map(task => (
          <Task data={task} key={task._id} />
        ))}
      </ul>
    </main>
  );
};

export default Main;

async function getData(url: string): Promise<any> {
  const response = await fetch(url);
  return response.json();
}
