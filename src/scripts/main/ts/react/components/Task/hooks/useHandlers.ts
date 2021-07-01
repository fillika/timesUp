import { useState, ChangeEvent, FocusEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { useUnmounting } from 'App/hooks/useUnmounting';
import { deleteTaskByName } from './../utils/deleteTaskByName';
import { updateTaskByName } from './../utils/updateTaskByName';
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
  const { app } = useSelector((state: RootState) => state);
  const [isUnmounting, startUnmount] = useUnmounting();
  const { delTaskByNameErrHadler, updTaskByNameErrHadler } = useGlobalError();

  const deleteTask = () =>
    app.token && deleteTaskByName(delTaskByNameErrHadler, data, app.token, startUnmount, dispatch);

  const updateTask = (event: FocusEvent<HTMLInputElement>) =>
    updateTaskByName(updTaskByNameErrHadler, event, data, app, dispatch);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value), setActive(false);
  };

  return [isUnmounting, isActive, name, setActive, deleteTask, updateTask, onChange];
};
