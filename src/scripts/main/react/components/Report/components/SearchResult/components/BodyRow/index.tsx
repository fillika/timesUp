import React from 'react';
import { time as timeUtil } from 'Utils/Time';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { DatabaseTask } from 'Types/tasks';
import { StyledCellName, StyledCellTime } from './style';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';

export const BodyRow: React.FC<{ name: string; time: number; taskList: DatabaseTask[] }> = ({
  name,
  time,
  taskList,
}) => {
  const history = useHistory();
  let { path, url } = useRouteMatch();

  console.log(taskList);

  return (
    <>
      <Switch>
        <Route path={path} exact>
          <TableRow>
            <StyledCellName onClick={() => history.push(`${url}/${name}`)}>{name}</StyledCellName>
            <StyledCellTime align='center'>{timeUtil.countTotalTime(time)}</StyledCellTime>
          </TableRow>
        </Route>

        <Route path={`${path}/:name`} exact>
          {taskList.map(task => (
            <TableRow key={task._id}>
              <StyledCellName>{task.name}</StyledCellName>
              <StyledCellTime align='center'>{timeUtil.createTemplateTime(task.start)} - {timeUtil.createTemplateTime(task.stop)} {timeUtil.countTotalTime(task.duration)}</StyledCellTime>
            </TableRow>
          ))}
        </Route>
      </Switch>
    </>
  );
};
