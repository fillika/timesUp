import { useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';

function useGetTasks() {
  const { sortedTaskList, isLoadMore, page } = useSelector((state: RootState) => state.tasks);
  return { isLoadMore,page, sortedTaskList };
}

export { useGetTasks };
