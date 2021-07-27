import React from 'react';
import { SearchForm } from './components/SearchForm';
import { SearchResult } from './components/SearchResult';

export const Report = () => {
  return (
    <div>
      <div>
        <SearchForm />
        <SearchResult />
      </div>
    </div>
  );
};
