import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';

import { mockData } from './mockData';
import { sort } from 'Utils/Sort';

const StyledCellTime = styled(TableCell)`
  width: 15%;
  min-width: 90px;
`;

const StyledCellName = styled(TableCell)`
  width: 85%;
`;

const dataForHTML = sort.sortReports(mockData);

const BodyRow: React.FC<{ name: string; time: string | number }> = ({ name, time }) => {
  return (
    <>
      <TableRow>
        <StyledCellName>{name}</StyledCellName>
        <StyledCellTime align='center'>{time}</StyledCellTime>
      </TableRow>
    </>
  );
};

export const SearchResult = () => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCellName>Name</StyledCellName>
              <StyledCellTime align='center'>Duration</StyledCellTime>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(dataForHTML).map(key => {
              const { taskList, total } = dataForHTML[key];
              return <BodyRow name={key} time={total} key={key} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
