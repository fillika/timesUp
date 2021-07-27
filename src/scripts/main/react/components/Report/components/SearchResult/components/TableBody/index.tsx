import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { BodyRow } from '../BodyRow';

export const TableBodyComponent = () => {
  const { sortedTaskList } = useSelector((state: RootState) => state.reportReducer);

  return (
    <TableBody>
      {Object.keys(sortedTaskList).map(key => {
        const { taskList, total } = sortedTaskList[key];
        return <BodyRow name={key} time={total} taskList={taskList} key={key} />;
      })}
    </TableBody>
  );
};
