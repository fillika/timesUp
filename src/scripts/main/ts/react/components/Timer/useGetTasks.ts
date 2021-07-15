import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';
import { sort } from 'Utils/Sort';

function useGetTasks() {
  const { databaseTaskList } = useSelector((state: RootState) => state.tasks);
  const sortedTaskList = sort.sortData(databaseTaskList);

  console.log('databaseTaskList[useGetTask]', databaseTaskList);
  console.log('sortedTaskArray[useGetTask]', sortedTaskList);
  
  return { sortedTaskList };
}

export { useGetTasks };
