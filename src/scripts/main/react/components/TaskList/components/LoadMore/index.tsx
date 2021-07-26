import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import { usePresenter } from './hooks/usePresenter';
import { useStyles } from './hooks/useStyles';

type LoadMoreFC = {
  isLoadMore: boolean;
  page: number;
};

export const LoadMore: FC<LoadMoreFC> = ({ isLoadMore, page }) => {
  const [statusState, onClickHandler] = usePresenter(page);
  const classes = useStyles();

  if (!isLoadMore) return null;

  return (
    <div className={classes.root}>
      <div>
        <Button onClick={onClickHandler} color='primary' disabled={statusState} variant='contained'>
          Загрузить еще
        </Button>
      </div>
    </div>
  );
};
