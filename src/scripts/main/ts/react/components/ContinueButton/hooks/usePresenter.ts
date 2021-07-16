import { useContext } from 'react';
import { useDispatch, shallowEqual, useStore, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { taskHandler } from 'Utils/TaskHandler';
import { ActiveTaskContext } from 'Scripts/main/ts/utils/Context';

export function usePresenter(name: string): [() => void, boolean] {
  const dispatch = useDispatch();
  const store = useStore();
  const { token } = useSelector((state: RootState) => state.app, shallowEqual);
  const { isTimeActive } = useContext(ActiveTaskContext);

  function startTask() {
    dispatch({ type: 'UPDATE_ACTIVE_TASK_NAME', payload: name });
    // * Тут не успевает обновляться activeTask, поэтому Я создаю свой (копию) и заменяю name на текущий
    const activeTaskCopy = { ...store.getState().activeTask, name };
    token && taskHandler.toggleTimer(activeTaskCopy, dispatch, token);
  }

  return [startTask, isTimeActive];
}
