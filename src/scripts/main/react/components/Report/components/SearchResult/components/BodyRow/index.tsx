import React from 'react';
import { time as timeUtil } from 'Utils/Time';
import TableRow from '@material-ui/core/TableRow';
import { DatabaseTask } from 'Types/tasks';
import { StyledCellName, StyledCellTime } from './style';

export const BodyRow: React.FC<{ name: string; time: number; taskList: DatabaseTask[] }> = ({ name, time }) => {
  return (
    <>
      <TableRow>
        <StyledCellName>{name}</StyledCellName>
        <StyledCellTime align='center'>{timeUtil.countTotalTime(time)}</StyledCellTime>
      </TableRow>
    </>
  );
};
