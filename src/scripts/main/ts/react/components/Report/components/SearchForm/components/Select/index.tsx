import React, { useState, ChangeEvent } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export const SelectComponent = () => {
  const selectOptions = ['Today', 'This week', 'Last week', 'This month', 'Last month', 'This year', 'Last year'];
  const [value, setValue] = useState('Today');

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <Select onChange={handleChange} value={value}>
      {selectOptions.map((val, index) => (
        <MenuItem value={val} key={index}>
          {val}
        </MenuItem>
      ))}
    </Select>
  );
};
