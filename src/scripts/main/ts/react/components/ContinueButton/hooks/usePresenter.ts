import { useDispatch, shallowEqual, useStore, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskHandler } from 'Utils/TaskHandler';

export function usePresenter(name: string): [() => void] {
  const dispatch = useDispatch();
  const store = useStore();
  const { token } = useSelector((state: RootState) => state.app, shallowEqual);

  function startTask() {
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: name });
    // * Тут не успевает обновляться activeTask, поэтому Я создаю свой (копию) и заменяю name на текущий
    const activeTaskCopy = { ...store.getState().activeTask, name };
    token && taskHandler.toggleTimer(activeTaskCopy, dispatch, token);
  }

  return [startTask];
}
