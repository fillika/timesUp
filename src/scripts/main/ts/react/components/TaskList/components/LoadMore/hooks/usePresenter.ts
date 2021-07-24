import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMoreTask } from 'Utils/helpers/getMoreTask';
import { AppError } from 'Utils/Error';
import { useStatusState } from 'App/hooks/useStatusState';
import { createNotify } from 'Redux/reducers/notifyReducer/actionCreators';

export const usePresenter = (page: number): [boolean, () => void] => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('JWT');
  const [status, setStatus] = useStatusState();
  const statusState: boolean = status === 'pending' ? true : false;

  // useEffect(() => console.log('Render[LoadMore]'));

  const fetchErrHandler = (err: AppError) => {
    setStatus('error');
    dispatch(createNotify('error', err.message));
  };

  const onClickHandler = async () => {
    setStatus('pending');
    const newPage = page + 1;

    const result: boolean = await getMoreTask(fetchErrHandler, newPage, token, dispatch);
    if (result) setStatus('success');
  };

  return [statusState, onClickHandler];
};
