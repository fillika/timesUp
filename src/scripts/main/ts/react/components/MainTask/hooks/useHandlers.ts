import { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { deleteTaskByName } from '../utils/deleteTaskByName';
import { TaskType } from 'Types/tasks';
import { useGlobalError } from 'App/hooks/useGlobalError';

type useHandlers = [
  boolean,
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => void,
];

export const useHandlers = (data: TaskType): useHandlers => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
  const [isTyping, setTyping] = useState(false);
  const { token } = useSelector((state: RootState) => state.app, shallowEqual);
  const { delTaskByNameErrHadler } = useGlobalError();

  const deleteTask = () => {
    if (isTyping) return;
    token && deleteTaskByName(delTaskByNameErrHadler, data, token, dispatch);
  };

  useEffect(() => console.log('Render[MainTask]'));

  return [isActive, isTyping, name, setActive, setTyping, deleteTask];
};
