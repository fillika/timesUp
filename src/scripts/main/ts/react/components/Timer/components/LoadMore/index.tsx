import React, { FC, useEffect } from 'react';
import './load-more.scss';
import { useDispatch } from 'react-redux';
import { getMoreTask } from 'Utils/helpers/getMoreTask';
import { AppError } from '../../../../../utils/Error';

export const LoadMore: FC<{ isLoadMore: boolean; page: number }> = ({ isLoadMore, page }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('JWT');

  useEffect(() => console.log('Render[LoadMore]'));

  const fetchErrHandler = (err: AppError) => {
    console.log('ERROR', err);
  };

  const getMoreTaskfetch = (page: number) => {
    getMoreTask(fetchErrHandler, page, token);
  };

  const onClickHandler = () => {
    const newPage = page + 1;
    // console.log('Get more tasks', newPage);
    // Запрос на сервер с отправкой данных из редюсера page
    getMoreTask(fetchErrHandler, newPage, token);

    // dispatch({ type: 'GET_MORE_TASKS', payload: { page: newPage } });
  };

  if (!isLoadMore) return null;

  return (
    <div className='load-more'>
      <div className='load-more__wrapper'>
        <button onClick={onClickHandler} className='button button--primary'>
          Load more
        </button>
      </div>
    </div>
  );
};
