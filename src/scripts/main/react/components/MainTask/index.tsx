import React from 'react';
import { SubTasks } from './components/SubTasks';
import { Counter } from './components/Counter';
import { TaskInput } from './components/TaskInput';
import { TaskPanel } from './components/TaskPanel';
import { TaskType } from 'Types/tasks';
import { useHandlers } from './hooks/useHandlers';
import { useStyles } from './hooks/useStyles';
import Collapse from '@material-ui/core/Collapse';
import { StyledTask } from './style';

type TaskData = {
  data: TaskType;
  index: number;
};

export const MainTask: React.FC<TaskData> = ({ data, index }) => {
  const [isActive, isMounted, isTyping, name, setActive, setTyping, deleteHandler, deleteTask] = useHandlers(data);
  const classes = useStyles();

  return (
    <li className={classes.task}>
      <StyledTask delay={index * 100}>
        <Collapse in={isMounted} onExited={deleteTask} timeout={650} unmountOnExit>
          <div className={classes.taskParent}>
            <Counter isActive={isActive} time={data.time} onClick={setActive} />
            <TaskInput data={data} setActive={setActive} setTyping={setTyping} />
            <TaskPanel data={data} isTyping={isTyping} name={name} deleteTask={deleteHandler} />
          </div>
        </Collapse>

        <Collapse in={isActive} timeout={300} unmountOnExit>
          <SubTasks isActive={isActive} data={data.time} name={data.name} />
        </Collapse>
      </StyledTask>
    </li>
  );
};
