import React from 'react';
import { useStyles } from './hooks/useStyles';
import { SearchForm } from './components/SearchForm/index';
import { SearchResult } from './components/SearchResult';

export const Report = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <SearchForm />
        <SearchResult />
      </div>
    </div>
  );
};
