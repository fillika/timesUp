import React from 'react';
import { StyledSearchResult } from './style';
import { TotalResultTable } from './components/TotalResultTable/index';

export const SearchResult = () => {
  return (
    <StyledSearchResult>
      <TotalResultTable />
    </StyledSearchResult>
  );
};
