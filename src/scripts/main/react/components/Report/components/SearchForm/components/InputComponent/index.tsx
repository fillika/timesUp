import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../../hooks/useStyles';

export const InputComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.inputWrapper}>
      <TextField label='Text task name' className={classes.searchInput} />
      <IconButton className={classes.searchIcon}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
