import { useState, FormEvent, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { authAPI } from 'Api/auth';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { useGlobalError } from 'App/hooks/useGlobalError';

type useGreetingsType = [
  isRegister: boolean,
  isInputHiding: boolean,
  submit: (event: FormEvent<HTMLFormElement>) => Promise<void>,
  toggleRegister: () => void
];

export function useGreetingsState(): useGreetingsType {
  const [isRegister, setResiter] = useState(true);
  const [isInputHiding, setInputHiding] = useState(false);
  const { authErrorHandler, getTasksHandlerErr } = useGlobalError();
  const dispatch = useDispatch();

  const auth = asyncCatcher(async (formData: FormData, dispatch: Dispatch<any>) => {
    const response = await authAPI.logIn(formData);

    if (response.status === 'success') {
      const token = response.data.token;
      localStorage.setItem('JWT', token);
      createNotify('success', 'Добро пожаловать!', dispatch);
      getAllTasks(getTasksHandlerErr, token, dispatch);
    }

    if (response.status === 'fail') {
      localStorage.removeItem('JWT');
      createNotify('error', response.message, dispatch);
    }

    return response;
  });

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isRegister) {
      const formData = new FormData(event.target as HTMLFormElement);
      auth(authErrorHandler, formData, dispatch);
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

  return [isRegister, isInputHiding, submit, toggleRegister];
}
