import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../../store/index';
import api from './../../../api/index';
import { sortData } from 'Scripts/main/ts/utils/tasks';

function useGetTasks() {
  const dispatch = useDispatch();
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await api.getAllTask();
        const tasks = sortData(response.data.tasks);
        dispatch({ type: 'ADD_TASKS', payload: tasks });
      } catch (error) {
        // Todo обработать ошибки
        console.error(error);
        dispatch({ type: 'ADD_TASKS', payload: [] });
      }
    };

    result();
  }, []);

  return taskArr;
}

export { useGetTasks };

