import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { time as timeUtil } from 'Utils/Time';

const StyledCellTime = styled(TableCell)`
  width: 15%;
  min-width: 90px;
`;

const StyledCellName = styled(TableCell)`
  width: 85%;
`;

const BodyRow: React.FC<{ name: string; time: number }> = ({ name, time }) => {
  return (
    <>
      <TableRow>
        <StyledCellName>{name}</StyledCellName>
        <StyledCellTime align='center'>{timeUtil.countTotalTime(time)}</StyledCellTime>
      </TableRow>
    </>
  );
};

export const SearchResult = () => {
  const reportReducer = useSelector((state: RootState) => state.reportReducer);

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
            {Object.keys(reportReducer).map(key => {
              const { taskList, total } = reportReducer[key];
              return <BodyRow name={key} time={total} key={key} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
