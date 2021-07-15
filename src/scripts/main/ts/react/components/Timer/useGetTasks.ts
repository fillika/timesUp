import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';

function useGetTasks() {
  const { databaseTaskList } = useSelector((state: RootState) => state.tasks);
  console.log('Render[Timer]');
  return { databaseTaskList };
}

export { useGetTasks };
