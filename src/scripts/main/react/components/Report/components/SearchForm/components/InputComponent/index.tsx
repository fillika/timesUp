import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { FormikProps } from 'formik';

export const InputComponent: React.FC<{
  formik: FormikProps<{
    nameOfTask: string;
    date: string;
  }>;
}> = ({ formik }) => {
  return (
    <div>
      <TextField
        name='nameOfTask'
        value={formik.values.nameOfTask}
        onChange={formik.handleChange}
        label='Text task name'
      />
      <IconButton type='submit'>
        <SearchIcon />
      </IconButton>
    </div>
  );
};
