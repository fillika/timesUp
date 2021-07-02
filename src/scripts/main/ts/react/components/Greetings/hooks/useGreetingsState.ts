import { useState, FormEvent, Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { authAPI } from 'Api/auth';

type FormikValues = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type useGreetingsType = [
  isRegister: boolean,
  isInputHiding: boolean,
  onSubmit: (values: FormikValues) => Promise<void>,
  toggleRegister: () => void
];

export function useGreetingsState(): useGreetingsType {
  const [isRegister, setResiter] = useState(true);
  const [isInputHiding, setInputHiding] = useState(false);
  const { getTasksErrorHandlerErr, authErrorHandler, signUpErrorHandler } = useGlobalError();
  const dispatch = useDispatch();


  const logIn = asyncCatcher(async (values: FormikValues, dispatch: Dispatch<any>) => {
    const response = await authAPI.logIn(values);

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

  const signUp = asyncCatcher(async (values: FormikValues, dispatch: Dispatch<any>) => {
    const response = await authAPI.signUp(values);

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

  const onSubmit = async (values: FormikValues) => {

    if (!isRegister) {
      logIn(authErrorHandler, values, dispatch);
    } else {
      signUp(signUpErrorHandler, values, dispatch);
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
