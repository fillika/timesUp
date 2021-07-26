import React from 'react';
import { FormikProps } from 'formik';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

const StyledSelectField = styled.div`
  display: flex;

  .select {
    width: 100%;
    max-width: 450px;
  }
`;

export const SelectComponent: React.FC<{ formik: FormikProps<{ nameOfTask: string; date: string }> }> = ({
  formik,
}) => {
  const selectOptions = ['Today', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year'];

  return (
    <StyledSelectField>
      <IconButton>
        <DateRangeIcon />
      </IconButton>

      <Select name='date' value={formik.values.date} onChange={formik.handleChange} className="select">
        {selectOptions.map((val, index) => (
          <MenuItem value={val} key={index}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </StyledSelectField>
  );
};
