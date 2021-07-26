import React from 'react';
import { FormikProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

const StyledSearchInput = styled.div`
  display: flex;
  width: 100%;
  padding-left: 16px;
  margin-top: 10px;

  .MuiTextField-root {
    width: 100%;
  }

  .MuiInputLabel-root {
  }
`;

export const InputComponent: React.FC<{
  formik: FormikProps<{
    nameOfTask: string;
    date: string;
  }>;
}> = ({ formik }) => {
  return (
    <StyledSearchInput>
      <TextField
        name='nameOfTask'
        value={formik.values.nameOfTask}
        onChange={formik.handleChange}
        label='Text task name'
      />
      <IconButton type='submit'>
        <SearchIcon />
      </IconButton>
    </StyledSearchInput>
  );
};
