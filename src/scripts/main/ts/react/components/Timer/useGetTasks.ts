import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { sort } from 'Utils/Sort';

function useGetTasks() {
  const { databaseTaskList } = useSelector((state: RootState) => state.tasks);
  const sortedTaskList = sort.sortData(databaseTaskList);
  
  return { sortedTaskList };
}

export { useGetTasks };
