import React from 'react';
import Task from './Task';

const Main: React.FC = () => {
  const data = [['Раз', 'Раз', 'Раз', 'Раз'], ['Два', 'Два'], ['Три', 'Три', 'Три'], ['Четыре']];

  return (
    <main className='main'>
      <ul className='task-list'>
        {data.map(tasks => (
          <Task tasks={tasks} />
        ))}
      </ul>
    </main>
  );
};

export default Main;
