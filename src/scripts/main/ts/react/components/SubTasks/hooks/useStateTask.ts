import { FocusEvent, useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { useUnmounting } from 'App/hooks/useUnmounting';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { deleteTaskByID } from '../utils/deleteTaskByID';
import { updateTaskByID } from '../utils/updateTask';

type useStateTaskType = [
  boolean,
  string,
  (event: FocusEvent<HTMLInputElement>) => Promise<void>,
  () => Promise<void>,
  (event: ChangeEvent<HTMLInputElement>) => void
];

export function useStateTask(name: string, _id: string): useStateTaskType {
  const dispatch = useDispatch();
  const { activeTask, app } = useSelector((state: RootState) => state);
  const [value, setValue] = useState(name);
  const [isUnmounting, startUnmount] = useUnmounting();
  const { delTaskByIdErrHadler, updTaskByIdErrHadler } = useGlobalError();

  useEffect(() => setValue(name), [activeTask.name]);

  const deleteTask = () => deleteTaskByID(delTaskByIdErrHadler, _id, app.token, startUnmount, dispatch);
  const updateTask = (event: FocusEvent<HTMLInputElement>) =>
    updateTaskByID(updTaskByIdErrHadler, _id, app.token, name, event, dispatch);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return [isUnmounting, value, updateTask, deleteTask, onChange];
}
