import React from 'react';
import { SelectComponent } from './components/SelectComponent';
import { InputComponent } from './components/InputComponent';

export const SearchForm = () => {
  return (
    <div>
      <form>
        <InputComponent />

    
          <SelectComponent />
      </form>
    </div>
  );
};
