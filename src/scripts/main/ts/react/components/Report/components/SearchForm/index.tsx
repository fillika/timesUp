import React from 'react';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';
import { useStyles } from './hooks/useStyles';

export const SearchForm = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form>
        <InputComponent />
        <SelectComponent />
      </form>
    </div>
  );
};
