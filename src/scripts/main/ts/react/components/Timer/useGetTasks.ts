import { useSelector } from 'react-redux';
import { RootState } from 'Redux/rootReducer';

function useGetTasks() {
  const taskArr = useSelector((state: RootState) => state.tasks.taskArr);
  console.log('Render[Timer]');
  return { taskArr };
}

export { useGetTasks };
