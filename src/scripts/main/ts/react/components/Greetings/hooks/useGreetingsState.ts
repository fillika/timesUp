import { useState, FormEvent, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { authAPI } from 'Api/auth';

type useGreetingsType = [
  isRegister: boolean,
  isInputHiding: boolean,
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>,
  toggleRegister: () => void
];

export function useGreetingsState(): useGreetingsType {
  const [isRegister, setResiter] = useState(true);
  const [isInputHiding, setInputHiding] = useState(false);
  const { getTasksErrorHandlerErr, authErrorHandler, signUpErrorHandler } = useGlobalError();
  const dispatch = useDispatch();

  const logIn = asyncCatcher(async (formData: FormData, dispatch: Dispatch<any>) => {
    const response = await authAPI.logIn(formData);

    if (response.status === 'success') {
      const token = response.data.token;
      localStorage.setItem('JWT', token);
      createNotify('success', 'Добро пожаловать!', dispatch);
      getAllTasks(getTasksErrorHandlerErr, token, dispatch);
    }

    if (response.status === 'fail') {
      localStorage.removeItem('JWT');
      createNotify('error', response.message, dispatch);
    }
  });

  const signUp = asyncCatcher(async (formData: FormData, dispatch: Dispatch<any>) => {
    const response = await authAPI.signUp(formData);

    if (response.status === 'success') {
      const token = response.data.token;
      localStorage.setItem('JWT', token);
      createNotify('success', 'Добро пожаловать!', dispatch);
      getAllTasks(getTasksErrorHandlerErr, token, dispatch);
    }

    if (response.status === 'fail') {
      localStorage.removeItem('JWT');
      createNotify('error', response.message, dispatch);
    }
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    if (!isRegister) {
      logIn(authErrorHandler, formData, dispatch);
    } else {
      signUp(signUpErrorHandler, formData, dispatch);
    }
  };

  const toggleRegister = () => {
    setInputHiding(!isInputHiding);

    if (isRegister) {
      let timerID = setTimeout(() => {
        setResiter(!isRegister);
        clearTimeout(timerID);
      }, 210);
    } else {
      setResiter(!isRegister);
    }
  };

  return [isRegister, isInputHiding, onSubmit, toggleRegister];
}
