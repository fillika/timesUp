import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeTimerModal, recalculateTime } from 'Redux/reducers/timerReducer/actionCreators';
import { RootState } from 'Redux/reducers/rootReducer';

type TimerPresenter = [boolean, boolean, string, () => void];

export const usePresenter = (): TimerPresenter => {
  const { isOpen, isActive, time, counter } = useSelector((state: RootState) => state.timer);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeTimerModal());

  useEffect(() => {
    const intervalTime = 100;
    let intervalID: any;

    if (isActive) {
      intervalID = setTimeout(() => dispatch(recalculateTime()), intervalTime);
    }

    return () => clearTimeout(intervalID);
  }, [counter, isActive]);

  // useEffect(() => console.log('Render[Timer]'));

  return [isOpen, isActive, time, handleClose];
};
