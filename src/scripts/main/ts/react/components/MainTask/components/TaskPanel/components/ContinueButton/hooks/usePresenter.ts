import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { continueTaskHadnler } from 'Redux/reducers/activeTaskReducer/middlewares';
import { ActiveTaskContext } from 'Scripts/main/ts/utils/Context';
import { getJWTToken } from 'Utils/helpers/getJWTToken';

export function usePresenter(name: string): [() => void, boolean] {
  const dispatch = useDispatch();
  const token = getJWTToken();
  const { isTimeActive } = useContext(ActiveTaskContext);

  const startTask = () => token && dispatch(continueTaskHadnler(name, token));

  return [startTask, isTimeActive];
}
