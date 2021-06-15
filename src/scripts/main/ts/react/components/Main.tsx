import React, { useEffect, useState } from 'react';
import Task from './Task';

const Main: React.FC = () => {
  const [taskArr, setTasks] = useState([]);
  const url = 'http://localhost:22222/api/v1/tasks';

  useEffect(() => {
    const result = async () => {
      try {
        const response = await getData(url);
        setTasks(response.data.tasks);
      } catch (error) {
        console.error(error);
      }
    };

    result();
  }, []);

  return (
    <main className='main'>
      <ul className='task-list'>
        {taskArr.map((tasks, index) => (
          <Task tasks={tasks} key={index} />
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
