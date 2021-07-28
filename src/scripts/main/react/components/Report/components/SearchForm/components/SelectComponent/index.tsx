import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from '@material-ui/core/IconButton';
import { StyledSelectField } from './styles';
import { SearchFormikProps } from '../..';
import { DayVariable } from '../../types';

export const SelectComponent: React.FC<SearchFormikProps> = ({ formik }) => {
  const selectOptions: DayVariable[] = [
    'Today',
    'This week',
    'Last week',
    'This month',
    'Last month',
    'This year',
    'Last year',
  ];

  const handleChange = (e: React.ChangeEvent<any>) => {
    formik.handleChange(e);
    formik.handleSubmit();
  };

  return (
    <StyledSelectField>
      <IconButton>
        <DateRangeIcon />
      </IconButton>

      <Select name='date' value={formik.values.date} onChange={handleChange} className='select'>
        {selectOptions.map((val, index) => (
          <MenuItem value={val} key={index}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </StyledSelectField>
  );
};
