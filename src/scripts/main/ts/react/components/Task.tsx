import React, { useState } from 'react';

const Task: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const childs = ['Привет Андрей', 'Привет Андрей', 'Привет Андрей', 'Привет Андрей', 'Привет Андрей'];

  return (
    <li className='task-list__task'>
      <div className='task task--parent'>
        {childs.length !== 0 && (
          <div className='task__counter' onClick={() => setActive(!isActive)}>
            {childs.length}
          </div>
        )}
        Имя таска (родитель)
      </div>

      {isActive ? (
        <div>
          <div className='task task--child'>Имя таска (ребенок)</div>
          <div className='task task--child'>Имя таска (ребенок)</div>
          <div className='task task--child'>Имя таска (ребенок)</div>
          <div className='task task--child'>Имя таска (ребенок)</div>
        </div>
      ) : null}
    </li>
  );
};

export default Task;
