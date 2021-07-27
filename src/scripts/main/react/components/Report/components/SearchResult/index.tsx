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
import { DatabaseTask } from 'Types/tasks';

const StyledCellTime = styled(TableCell)`
  width: 15%;
  min-width: 90px;
`;

const StyledCellName = styled(TableCell)`
  width: 85%;
`;

const BodyRow: React.FC<{ name: string; time: number; taskList: DatabaseTask[] }> = ({ name, time }) => {
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
  const { sortedTaskList } = useSelector((state: RootState) => state.reportReducer);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCellName>Name</StyledCellName>
              <StyledCellTime align='center'>Total</StyledCellTime>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(sortedTaskList).map(key => {
              const { taskList, total } = sortedTaskList[key];
              return <BodyRow name={key} time={total} taskList={taskList} key={key} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
