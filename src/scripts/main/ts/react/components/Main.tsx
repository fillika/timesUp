import React, { useEffect, useState } from 'react';
import Task from './Task';

const Main: React.FC = () => {
  const [data2, setData] = useState([]);
  const url = 'http://localhost:22222/api/tasks';

  useEffect(() => {
    const result = async () => {
      const response = await getData(url);
      setData(response);
    };

    result();
  }, []);

  console.log(data2);

  return (
    <main className='main'>
      <ul className='task-list'>
        {data2.map((tasks, index) => (
          <Task tasks={tasks} key={index} />
        ))}
      </ul>
    </main>
  );
};

export default Main;

async function getData(url: string, data = {}): Promise<any> {
  const headers: RequestInit = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  const response = await fetch(url, headers);
  return response.json();
}
