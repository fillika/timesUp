import React from 'react';
import TextField from '@material-ui/core/TextField';
import { SelectComponent } from './components/Select/index';

export const SearchForm = () => {
  return (
    <div>
      <form>
        <TextField label='Text task name' />

        <div>
          <p>По времени</p>

          <SelectComponent />
        </div>
        <span>Иконка</span>
      </form>
    </div>
  );
};
