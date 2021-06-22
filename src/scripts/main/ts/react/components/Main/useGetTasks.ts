import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/index';
import api from 'Api/index';
import {sort} from 'Utils/Sort';

function useGetTasks() {
  const dispatch = useDispatch();
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await api.getAllTask();
        const tasks = sort.sortData(response.data.tasks);
        dispatch({ type: 'GET_ALL_TASKS', payload: tasks });
      } catch (error) {
        // Todo обработать ошибки
        console.error(error);
        dispatch({ type: 'GET_ALL_TASKS', payload: [] });
      }
    };

    result();
  }, []);

  return taskArr;
}

export { useGetTasks };

