import { useContext } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { RootState } from 'Redux/reducers/rootReducer';
import { ActiveTaskContext } from 'Scripts/main/ts/utils/Context';
import { continueTaskHadnler } from 'Redux/reducers/taskReducer/actionCreators';

export function usePresenter(name: string): [() => void, boolean] {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.app, shallowEqual);
  const { isTimeActive } = useContext(ActiveTaskContext);

  const startTask = () => token && dispatch(continueTaskHadnler(name, token));

  return [startTask, isTimeActive];
}
