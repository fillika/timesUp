import { FocusEvent, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { deleteTaskByID } from '../utils/deleteTaskByID';
import { updateTaskByID } from '../utils/updateTask';

type useStateTaskType = [
  boolean,
  string,
  (event: FocusEvent<HTMLInputElement>) => Promise<void>,
  () => void,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (event: KeyboardEvent) => void
];

export function useStateTask(name: string, _id: string): useStateTaskType {
  const dispatch = useDispatch();
  const {
    activeTask: { name: taskName },
    app: { token },
  } = useSelector((state: RootState) => state, shallowEqual);
  const [value, setValue] = useState(name);
  const [isTyping, setTyping] = useState(false);
  const { delTaskByIdErrHadler, updTaskByIdErrHadler } = useGlobalError();

  useEffect(() => setValue(name), [taskName]);

  const deleteTask = () => {
    if (isTyping) return;
    deleteTaskByID(delTaskByIdErrHadler, _id, token, dispatch);
  };

  const updateTask = (event: FocusEvent<HTMLInputElement>) =>
    updateTaskByID(updTaskByIdErrHadler, _id, token, name, event, dispatch);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value), setTyping(true);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.target.blur();
    }
  };

  return [isTyping, value, updateTask, deleteTask, onChange, onKeyPress];
}
