import { FocusEvent, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { deleteTaskByID, updateTaskByID } from 'Redux/reducers/taskReducer/middlewares';
import { getJWTToken } from 'Utils/helpers/getJWTToken';

type useStateTaskType = [
  boolean,
  string,
  (event: FocusEvent<HTMLInputElement>) => void,
  () => void,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (event: KeyboardEvent) => void
];

export function useStateTask(name: string, _id: string): useStateTaskType {
  const dispatch = useDispatch();
  const { name: taskName } = useSelector((state: RootState) => state.activeTask, shallowEqual);
  const token = getJWTToken();
  const [value, setValue] = useState(name);
  const [isTyping, setTyping] = useState(false);

  useEffect(() => setValue(name), [taskName]);

  const deleteTask = () => {
    !isTyping && token && dispatch(deleteTaskByID(_id, token));
  };

  const updateTask = (event: FocusEvent<HTMLInputElement>) => {
    const val = event.target.value.trim();
    if (val !== name && token) dispatch(updateTaskByID(_id, val, token));
  };

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
