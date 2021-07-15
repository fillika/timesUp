import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';

function useGetTasks() {
  const { taskArr } = useSelector((state: RootState) => state.tasks);
  
  return { taskArr };
}

export { useGetTasks };
