import React, { useState, ChangeEvent } from 'react';
import SubTasks from './SubtTasks';

const Task: React.FC = () => {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState('Таск родитель (заголовок)');

  // TODO: Получить список задач как child
  const childrens = ['Привет Андрей', 'Привет Андрей', 'Привет Андрей', 'Привет Андрей', 'Привет Андрей'];
  const $counter = childrens.length !== 0 && (
    <div className='task__counter' onClick={() => setActive(!isActive)}>
      {childrens.length}
    </div>
  );

  return (
    <li className='task-list__task'>
      <div className='task task--parent'>
        {$counter}
        <div>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event?.target.value)}
            type='text'
            value={value}
          />
        </div>
      </div>

      {isActive && <SubTasks subTasks={childrens} />}
    </li>
  );
};

export default Task;
