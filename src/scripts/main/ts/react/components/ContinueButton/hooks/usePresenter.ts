import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskHandler } from 'Utils/TaskHandler';

export function usePresenter(name: string) {
  const dispatch = useDispatch();
  const { app, activeTask } = useSelector((state: RootState) => state);

  function startTask() {
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: name });
    // * Тут не успевает обновляться activeTask, поэтому Я создаю свой (копию) и заменяю name на текущий
    const activeTaskCopy = { ...activeTask, name };
    app.token && taskHandler.toggleTimer(activeTaskCopy, dispatch, app.token);
  }

  return [startTask];
}
