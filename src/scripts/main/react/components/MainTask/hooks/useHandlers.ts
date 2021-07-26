import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { deleteTaskByName } from '../utils/deleteTaskByName';
import { TaskType } from 'Types/tasks';
import { useGlobalError } from 'App/hooks/useGlobalError';

type useHandlers = [
  boolean,
  boolean,
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => void,
  () => void
];

export const useHandlers = (data: TaskType): useHandlers => {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false);
  const [name, setName] = useState(data.name);
  const [isTyping, setTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const token = useSelector((state: RootState) => state.app.token, shallowEqual);
  const { delTaskByNameErrHadler } = useGlobalError();

  const deleteTask = () => {
    if (isTyping) return;
    if (token) return deleteTaskByName(delTaskByNameErrHadler, data, token, dispatch);
  };

  const deleteHandler = () => {
    setActive(false);
    setIsMounted(false);
  }
  
  // useEffect(() => console.log('Render[MainTask]', data.name));

  return [isActive, isMounted, isTyping, name, setActive, setTyping, deleteHandler, deleteTask];
};
