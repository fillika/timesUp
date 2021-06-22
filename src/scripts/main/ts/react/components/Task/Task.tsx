import React, { useState, ChangeEvent } from 'react';
import { TaskType } from 'Types/tasks';
import SubTasks from '../SubTasks';
import { time } from 'Utils/Time';
import trashIcon from 'Images/icons/trash.svg';
import api from 'Api/index';
import { useDispatch } from 'react-redux';

type TaskData = {
  data: TaskType;
};

const Task: React.FC<TaskData> = ({ data }) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  function counter() {
    if (data.time !== undefined) {
      if (data.time.length > 1) {
        return (
          <div className='task__counter' onClick={() => setActive(!isActive)}>
            {data.time.length}
          </div>
        );
      } else {
        setActive(false);
        return null;
      }
    }
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  async function deleteTaskByName() {
    const response = await api.deleteTaskByName({
      name: data.name,
      date: data.at,
    });

    if (response?.status) {
      dispatch({ type: 'DELETE_TASKS_BY_NAME', payload: { date: data.at, name: data.name } });
      console.log(response.message); // Todo выводить в всплывашки
    } else {
      console.error('Ошибка. Таски не удалены по какой-то причине');
    }
  }

  return (
    <li className='task-list__task'>
      <div className='task task--parent'>
        {counter()}
        <div className='task__input-wrapper'>
          <input
            // onBlur={onBlur}
            type='text'
            defaultValue={data.name}
          />
        </div>
        <div className='task-panel'>
          <div onClick={deleteTaskByName} className='task-panel__icon task-panel__icon--delete'>
            <img src={trashIcon} alt='Удалить таск' />
          </div>
          <span>
            {
              time.countTotalTime(data.duration)
            }
          </span>
        </div>
      </div>

      {isActive && data.time !== undefined && data.time?.length > 1 && <SubTasks data={data.time} name={data.name} />}
    </li>
  );
};

export default Task;
