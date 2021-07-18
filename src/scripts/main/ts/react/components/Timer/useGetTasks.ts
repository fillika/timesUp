import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';

function useGetTasks() {
  const { sortedTaskList } = useSelector((state: RootState) => state.tasks);
  return { sortedTaskList };
}

export { useGetTasks };
