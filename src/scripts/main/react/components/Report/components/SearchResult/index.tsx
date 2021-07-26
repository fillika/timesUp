import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';

const StyledCellTime = styled(TableCell)`
  width: 15%;
  min-width: 90px;
`;

const StyledCellName = styled(TableCell)`
  width: 85%;
`;

const BodyRow: React.FC<{ name: string; time: string }> = ({ name, time }) => {
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
              <StyledCellName>Name of task</StyledCellName>
              <StyledCellTime align='center'>Duration</StyledCellTime>
            </TableRow>
          </TableHead>
          <TableBody>
            <BodyRow name='Task 1' time={'1:15:28'} />
            <BodyRow name='Task 2' time={'0:18:12'} />
            <BodyRow name='Task 3' time={'0:47:01'} />
            <BodyRow name='Task 4' time={'2:47:01'} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
