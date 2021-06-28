import React, { useState, ChangeEvent, Dispatch } from 'react';
import { TaskType } from 'Types/tasks';
import SubTasks from 'App/components/SubTasks';
import trashIcon from 'Images/icons/trash.svg';
import taskAPI from 'Api/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { RangeTime } from 'App/components/RangeTime';
import { sort } from 'Utils/Sort';
import { useUnmounting } from 'Utils/hooks/useUnmounting';
import { RootState } from 'Redux/index';
import { AppState } from 'Scripts/main/ts/store/app';

type TaskData = {
  data: TaskType;
};

const updateTaskByName = async (
  event: React.FocusEvent<HTMLInputElement>,
  data: TaskType,
  state: AppState,
  dispatch: Dispatch<any>
) => {
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

      if (!state.token) return console.error('Токена нет');
      const response = await taskAPI.updateTaskByName(queryReq, state.token);

      dispatch({ type: 'UPDATE_TASK_LIST', payload: sort.sortData(response.data.tasks) });
    } catch (error) {
      console.log(error);
    }
  }
};

const deleteTaskByName = async (
  data: TaskType,
  state: AppState,
  startUnmount: (cb: any) => void,
  dispatch: Dispatch<any>
) => {
  if (!state.token) return console.log('Токена нет');
  const response = await taskAPI.deleteTaskByName({ name: data.name, date: data.at }, state.token);

  if (response?.status) {
    startUnmount(() => dispatch({ type: 'DELETE_TASKS_BY_NAME', payload: { date: data.at, name: data.name } }));
  } else {
    console.error('Ошибка. Таски не удалены по какой-то причине');
  }
};

const Task: React.FC<TaskData> = ({ data }) => {
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.app);
  const [isUnmounting, startUnmount] = useUnmounting();

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

  return (
    <li className={`task-list__task ${isUnmounting ? 'task-list__task--unmounting' : ''}`}>
      <div className='task task--parent'>
        {counter()}
        <div className='task__input-wrapper'>
          <input
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => updateTaskByName(event, data, state, dispatch)}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            type='text'
            defaultValue={name}
          />
        </div>
        <div className='task-panel'>
          <div
            onClick={() => deleteTaskByName(data, state, startUnmount, dispatch)}
            className='task-panel__icon task-panel__icon--delete'>
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
