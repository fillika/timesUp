import React, { useEffect } from 'react';
import { authAPI } from 'Scripts/main/api/auth';
import { useParams, useHistory } from 'react-router-dom';
import { notifyError, notifySuccess } from 'Redux/reducers/notifyReducer/actionCreators';
import { getAllTasks } from 'Utils/helpers/getAllTasks';
import { useDispatch } from 'react-redux';
import { asyncCatcher } from 'Utils/helpers/asyncCatcher';
import { AppError } from 'Utils/Error';

export const ConfirmRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams<{ token: string }>();

  const sendConfirmRequest = asyncCatcher(async () => {
    await authAPI.confirmRegister({ token });

    dispatch(notifySuccess('Вы успешно прошли регистрацию!', 5500))
    dispatch(getAllTasks(token));
  });

  const sendConfirmErrHandler = (err: AppError) => {
    switch (err.statusCode) {
      default:
        dispatch(notifyError(err.message));
        break;
    }
    history.push('/login');
  };

  useEffect(() => {
    sendConfirmRequest(sendConfirmErrHandler);
  }, []);

  return <div></div>;
};
