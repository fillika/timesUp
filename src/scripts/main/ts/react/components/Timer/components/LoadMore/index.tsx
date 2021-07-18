import React, { FC } from 'react';
import './load-more.scss';

export const LoadMore: FC<{ isLoadMore: boolean }> = ({ isLoadMore }) => {
  if (!isLoadMore) return null;
  
  return (
    <div className='load-more'>
      <div className='load-more__wrapper'>
        <button className='button button--primary'>Load more</button>
      </div>
    </div>
  );
};
