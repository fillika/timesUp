import React from 'react';
import { FormikProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { SearchFormikProps } from '../..';

const StyledSearchInput = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;

  .MuiTextField-root {
    width: 100%;
  }

  .MuiInputLabel-root {
  }
`;

export const InputComponent: React.FC<SearchFormikProps> = ({ formik }) => {
  console.log(formik.errors);

  return (
    <StyledSearchInput>
      <IconButton type='submit'>
        <SearchIcon />
      </IconButton>
      <TextField
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.errors.name ? true : false}
        label={formik.errors.name ? 'Error' : 'Text task name'}
        helperText={formik.errors.name ? formik.errors.name : null}
      />
    </StyledSearchInput>
  );
};
