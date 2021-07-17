import React, { useEffect } from 'react';
import { authAPI } from 'Api/auth';
import { useParams, useHistory } from 'react-router-dom';
import { useGlobalError } from 'App/hooks/useGlobalError';
import { createNotify } from 'Utils/helpers/createNotify';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { useDispatch } from 'react-redux';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { AppError } from 'Utils/Error';

export const ConfirmRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const { getTasksErrorHandlerErr } = useGlobalError();

  const sendConfirmRequest = asyncCatcher(async () => {
    await authAPI.confirmRegister({ token });

    createNotify('success', 'Вы успешно прошли регистрацию!', dispatch, 5500);
    getAllTasks(getTasksErrorHandlerErr, token, dispatch);
  });

  const sendConfirmErrHandler = (err: AppError) => {
    switch (err.statusCode) {
      default:
        createNotify('error', err.message, dispatch);
        break;
    }
    history.push('/login');
  };

  useEffect(() => {
    sendConfirmRequest(sendConfirmErrHandler);
  }, []);

  return <div>ConfirmRegister</div>;
};
