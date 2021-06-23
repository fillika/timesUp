import React, { useState, ChangeEvent } from 'react';
import { TaskType } from 'Types/tasks';
import SubTasks from '../SubTasks';
import trashIcon from 'Images/icons/trash.svg';
import api from 'Api/index';
import { useDispatch } from 'react-redux';
import { RangeTime } from 'App/components/RangeTime';
import { sort } from 'Utils/Sort';

type TaskData = {
  data: TaskType;
};

const Task: React.FC<TaskData> = ({ data }) => {
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
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

  async function updateTaskByName(event: React.FocusEvent<HTMLInputElement>) {
    const val = event.target.value.trim();

    if (val !== data.name) {
      try {
        const queryReq = {
          name: data.name,
          date: data.at,
          set: {
            name: val,
          },
        };
        const response = await api.updateTaskByName(queryReq);

        dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
      } catch (error) {}
    }
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
            onBlur={updateTaskByName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            type='text'
            defaultValue={name}
          />
        </div>
        <div className='task-panel'>
          <div onClick={deleteTaskByName} className='task-panel__icon task-panel__icon--delete'>
            <img src={trashIcon} alt='Удалить таск' />
          </div>
          <RangeTime data={data} />
        </div>
      </div>

      {isActive && data.time !== undefined && data.time?.length > 1 && <SubTasks data={data.time} name={name} />}
    </li>
  );
};

export default Task;
