import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { ActiveTaskContext } from 'Scripts/main/ts/utils/Context';
import { continueTaskHadnler } from 'Redux/reducers/taskReducer/actionCreators';
import { getJWTToken } from 'Utils/helpers/getJWTToken';

export function usePresenter(name: string): [() => void, boolean] {
  const dispatch = useDispatch();
  const token = getJWTToken();
  const { isTimeActive } = useContext(ActiveTaskContext);

  const startTask = () => token && dispatch(continueTaskHadnler(name, token));

  return [startTask, isTimeActive];
}
