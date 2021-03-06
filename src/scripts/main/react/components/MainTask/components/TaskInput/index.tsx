import React, { FC, ChangeEvent, FocusEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useStyles } from '../../hooks/useStyles';
import { TaskType } from 'Types/tasks';
import { updateTaskByName } from 'Redux/reducers/taskReducer/middlewares';
import { getJWTToken } from 'Scripts/main/utils/helpers/JWTHadlers';

type TaskInput = {
  data: TaskType;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setTyping: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TaskInput: FC<TaskInput> = ({ data, setActive, setTyping }) => {
  const dispatch = useDispatch();
  const token = getJWTToken();
  const [name, setName] = useState(data.name);
  const classes = useStyles();

  useEffect(() => setName(data.name), [data.name]);

  const updateTask = (event: FocusEvent<HTMLInputElement>) => {
    const val = event.target.value.trim();

    if (val !== data.name && token) {
      dispatch(updateTaskByName(val, token, data));
      setTyping(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value), setActive(false), setTyping(true);
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.target.blur();
    }
  };

  // useEffect(() => console.log('Render[TaskInput]'));

  return (
    <div className={classes.inputWRapper}>
      <input
        onBlur={updateTask}
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={name}
        className={classes.input}
        type='text'
      />
    </div>
  );
};
