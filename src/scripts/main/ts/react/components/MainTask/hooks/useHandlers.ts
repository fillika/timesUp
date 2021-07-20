import { useState, useEffect, useCallback } from 'react';
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
  () => void
];

export const useHandlers = (data: TaskType): useHandlers => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
  const [isTyping, setTyping] = useState(false);
  const token = useSelector((state: RootState) => state.app.token, shallowEqual);
  const { delTaskByNameErrHadler } = useGlobalError();

  const deleteTask = useCallback(() => {
    if (isTyping) return;
    if (token) return deleteTaskByName(delTaskByNameErrHadler, data, token, dispatch);
  }, [isTyping]);

  useEffect(() => console.log('Render[MainTask]', data.name));

  return [isActive, isTyping, name, setActive, setTyping, deleteTask];
};
