import { useState, ChangeEvent, FocusEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { useUnmounting } from 'App/hooks/useUnmounting';
import { deleteTaskByName } from '../utils/deleteTaskByName';
import { updateTaskByName } from '../utils/updateTaskByName';
import { TaskType } from 'Types/tasks';
import { useGlobalError } from 'App/hooks/useGlobalError';

type useHandlers = [
  boolean,
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => '' | Promise<void> | null,
  (event: React.FocusEvent<HTMLInputElement>) => Promise<void>,
  (event: ChangeEvent<HTMLInputElement>) => void
];

export const useHandlers = (data: TaskType): useHandlers => {
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.app);
  const [isUnmounting, startUnmount] = useUnmounting();
  const { delTaskByNameErrHadler, updTaskByNameErrHadler } = useGlobalError();

  console.log('Render[MainTask]');

  const deleteTask = () =>
    token && deleteTaskByName(delTaskByNameErrHadler, data, token, startUnmount, dispatch);

  const updateTask = (event: FocusEvent<HTMLInputElement>) =>
    updateTaskByName(updTaskByNameErrHadler, event, data, token, dispatch);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value), setActive(false);
  };

  return [isUnmounting, isActive, name, setActive, deleteTask, updateTask, onChange];
};
