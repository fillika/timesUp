import React from 'react';
import { useSelector } from 'react-redux';
import { BodyRow } from '../BodyRow/index';
import { RootState } from 'Redux/reducers/rootReducer';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

export const MoreResultTable = () => {
  const { sortedTaskList } = useSelector((state: RootState) => state.reportReducer);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>More result</TableCell>
          <TableCell align='center'>Total 2</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(sortedTaskList).map(key => {
          const { taskList, total } = sortedTaskList[key];
          return <BodyRow name={key} time={total} taskList={taskList} key={key} />;
        })}
      </TableBody>
    </Table>
  );
};
