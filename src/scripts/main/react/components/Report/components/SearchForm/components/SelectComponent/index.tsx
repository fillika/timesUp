import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { FormikProps } from 'formik';

export const SelectComponent: React.FC<{ formik: FormikProps<{ nameOfTask: string; date: string }> }> = ({
  formik,
}) => {
  const selectOptions = ['Today', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year'];

  return (
    <div>
      <div>
        <DateRangeIcon />
      </div>

      <Select name='date' value={formik.values.date} onChange={formik.handleChange}>
        {selectOptions.map((val, index) => (
          <MenuItem value={val} key={index}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
