import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { continueTaskHadnler } from 'Redux/reducers/activeTaskReducer/middlewares';
import { ActiveTaskContext } from 'Utils/Context';
import { getJWTToken } from 'Scripts/main/utils/helpers/JWTHadlers';

export function usePresenter(name: string): [() => void, boolean] {
  const dispatch = useDispatch();
  const token = getJWTToken();
  const { isTimeActive } = useContext(ActiveTaskContext);

  const startTask = () => token && dispatch(continueTaskHadnler(name, token));

  return [startTask, isTimeActive];
}
