import React, { FC, memo, ChangeEvent, FocusEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { updateTaskByName } from '../utils/updateTaskByName';
import { TaskType } from 'Types/tasks';
import { RootState } from 'Redux/reducers/rootReducer';

type TaskInput = {
  data: TaskType;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTyping: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskInput: FC<TaskInput> = ({ data, setActive, setTyping }) => {
  const dispatch = useDispatch();
  const { updTaskByNameErrHadler } = useGlobalError();
  const { token } = useSelector((state: RootState) => state.app, shallowEqual);
  const [name, setName] = useState(data.name);

  const updateTask = (event: FocusEvent<HTMLInputElement>) => {
    updateTaskByName(updTaskByNameErrHadler, event, data, token, dispatch);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value), setActive(false), setTyping(true);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.target.blur();
    }
  };

  // useEffect(() => console.log('Render[TaskInput]'));

  return (
    <div className='task__input-wrapper'>
      <input type='text' onBlur={updateTask} onChange={onChange} onKeyPress={onKeyPress} defaultValue={name} />
    </div>
  );
};
