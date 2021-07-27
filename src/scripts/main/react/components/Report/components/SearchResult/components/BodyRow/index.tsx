import React from 'react';
import { time as timeUtil } from 'Utils/Time';
import TableRow from '@material-ui/core/TableRow';
import { DatabaseTask } from 'Types/tasks';
import { StyledCellName, StyledCellTime } from './style';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const BodyRow: React.FC<{ name: string; time: number; taskList: DatabaseTask[] }> = ({
  name,
  time,
  taskList,
}) => {
  const history = useHistory();
  let { path, url } = useRouteMatch();

  return (
    <>
      <TableRow>
        <StyledCellName onClick={() => history.push(`${url}/${name}`)}>{name}</StyledCellName>
        <StyledCellTime align='center'>{timeUtil.countTotalTime(time)}</StyledCellTime>
      </TableRow>
    </>
  );
};
