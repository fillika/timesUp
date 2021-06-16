import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../store/index';
import Task from './Task';

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
  }, []);

  return (
    <main className='main'>
      <ul className='task-list'>
        {taskArr.map((task, index) => (
          <Task data={task} key={index} />
        ))}
      </ul>
    </main>
  );
};

export default Main;

async function getData(url: string, data = {}): Promise<any> {
  // const headers: RequestInit = {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data), // body data type must match "Content-Type" header
  // };
  const response = await fetch(url);
  return response.json();
}
