import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { StyledTableCell, StyledTableRow, StyledDate } from './../BodyRow/style';
import { time as timeUtil } from 'Utils/Time';
import Button from '@material-ui/core/Button';

export const MoreInfoAboutTask = () => {
  const { sortedTaskList } = useSelector((state: RootState) => state.reportReducer);
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  let totalTime = 0;

  if (sortedTaskList[name] === undefined) {
    return <Redirect to='/reports' />;
  }

  const { taskList } = sortedTaskList[name];
  const goBack = () => history.goBack();

  taskList.forEach(task => (totalTime += task.duration));

  return (
    <>
      <Button onClick={goBack} style={{ marginBottom: '1em' }} size='large' color='primary' variant='contained'>
        Назад
      </Button>

      {taskList.map(task => (
        <StyledTableRow key={task._id}>
          <StyledTableCell styleWidth={70}>{task.name}</StyledTableCell>
          <StyledTableCell styleWidth={20} justifyContent='center' direction='column' minWidth={160}>
            <StyledDate>{new Date(task.at).toLocaleDateString()}</StyledDate>
            <div>
              {timeUtil.createTemplateTime(task.start)} - {timeUtil.createTemplateTime(task.stop)}
            </div>
          </StyledTableCell>
          <StyledTableCell styleWidth={10} justifyContent='center'>
            {timeUtil.countTotalTime(task.duration)}
          </StyledTableCell>
        </StyledTableRow>
      ))}
      <StyledTableRow>
        <StyledTableCell styleWidth={90}></StyledTableCell>
        <StyledTableCell styleWidth={10} justifyContent='center'>
          <strong>{timeUtil.countTotalTime(totalTime)}</strong>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
