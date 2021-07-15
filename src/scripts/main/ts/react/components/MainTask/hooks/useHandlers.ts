import { useState, ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
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
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => void,
  (event: React.FocusEvent<HTMLInputElement>) => Promise<void>,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (event: KeyboardEvent) => void
];

export const useHandlers = (data: TaskType): useHandlers => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
  const [isTyping, setTyping] = useState(false);
  const { token } = useSelector((state: RootState) => state.app);
  const [isUnmounting, startUnmount] = useUnmounting();
  const { delTaskByNameErrHadler, updTaskByNameErrHadler } = useGlobalError();

  const deleteTask = () => {
    if (isTyping) return;
    token && deleteTaskByName(delTaskByNameErrHadler, data, token, startUnmount, dispatch);
  };

  const updateTask = (event: FocusEvent<HTMLInputElement>) =>
    updateTaskByName(updTaskByNameErrHadler, event, data, token, dispatch);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value), setActive(false), setTyping(true);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.target.blur();
    }
  };

  console.log('Render[MainTask]');

  return [isUnmounting, isActive, isTyping, name, setActive, deleteTask, updateTask, onChange, onKeyPress];
};
