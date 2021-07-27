import React from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { StyledSearchResult } from './style';
import { TableBodyComponent } from './components/TableBody';

export const SearchResult = () => {
  return (
    <StyledSearchResult>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBodyComponent />
        </Table>
      </TableContainer>
    </StyledSearchResult>
  );
};
