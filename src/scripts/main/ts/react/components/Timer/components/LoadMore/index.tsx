import React, { FC, useEffect } from 'react';
import './load-more.scss';
import { useDispatch } from 'react-redux';

export const LoadMore: FC<{ isLoadMore: boolean; page: number }> = ({ isLoadMore, page }) => {
  const dispatch = useDispatch();

  useEffect(() => console.log('Render[LoadMore]'));

  const onClickHandler = () => {
    const newPage = page + 1;
    console.log('Get more tasks', newPage);
    // Запрос на сервер с отправкой данных из редюсера page
    dispatch({ type: 'GET_MORE_TASKS', payload: { page: newPage } });
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
