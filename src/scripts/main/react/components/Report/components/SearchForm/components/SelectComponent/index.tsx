import React, { useState, ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useStyles } from '../../hooks/useStyles';

export const SelectComponent = () => {
  const classes = useStyles();

  const selectOptions = ['Today', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year'];
  const [value, setValue] = useState('Today');

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <div className={classes.timeWrapper}>
      <div className={classes.timeIconWrapper}>
        <DateRangeIcon />
      </div>

      <Select onChange={handleChange} value={value} className={classes.timeSelect}>
        {selectOptions.map((val, index) => (
          <MenuItem value={val} key={index}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
