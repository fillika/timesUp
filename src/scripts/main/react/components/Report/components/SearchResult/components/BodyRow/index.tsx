import React from 'react';
import { time as timeUtil } from 'Utils/Time';
import TableRow from '@material-ui/core/TableRow';
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

  // TODO - Вынести роуты выше, так как нужно будет менять таблицу, её стили и добавлять кнопку "Назад"
  // TODO - Переключение будет между таблицами
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
