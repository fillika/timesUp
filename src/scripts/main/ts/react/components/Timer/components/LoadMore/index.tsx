import React, { FC } from 'react';

import './load-more.scss';
import { usePresenter } from './hooks/usePresenter';

export const LoadMore: FC<{ isLoadMore: boolean; page: number }> = ({ isLoadMore, page }) => {
  const [statusState, onClickHandler] = usePresenter(page);

  if (!isLoadMore) return null;

  return (
    <div className='load-more'>
      <div className='load-more__wrapper'>
        <button onClick={onClickHandler} className='button button--primary' disabled={statusState}>
          Загрузить еще
        </button>
      </div>
    </div>
  );
};
