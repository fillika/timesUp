import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../../store/index';
import api from './../../../api/index';


function useGetTasks(url: string) {
  const dispatch = useDispatch();
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await api.getAllTask(url);
        dispatch({ type: 'ADD_TASKS', payload: response.data.tasks });
      } catch (error) {
        // Todo обработать ошибки
        console.error(error);
      }
    };

    result();
  }, []);

  return taskArr;
}

export { useGetTasks };
