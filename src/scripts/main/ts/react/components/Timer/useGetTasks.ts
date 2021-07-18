import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';

function useGetTasks() {
  const { sortedTaskList, isLoadMore } = useSelector((state: RootState) => state.tasks);
  return { isLoadMore, sortedTaskList };
}

export { useGetTasks };
