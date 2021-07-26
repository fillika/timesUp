import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTaskByName } from 'Redux/reducers/taskReducer/middlewares';
import { TaskType } from 'Types/tasks';
import { getJWTToken } from 'Utils/helpers/getJWTToken';

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
  const token = getJWTToken();

  const deleteTask = () => {
    !isTyping && token && dispatch(deleteTaskByName(token, data));
  };

  const deleteHandler = () => {
    setActive(false);
    setIsMounted(false);
  };

  // useEffect(() => console.log('Render[MainTask]', data.name));

  return [isActive, isMounted, isTyping, name, setActive, setTyping, deleteHandler, deleteTask];
};
