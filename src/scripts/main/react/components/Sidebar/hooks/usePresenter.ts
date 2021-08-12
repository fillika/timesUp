import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { notifyError } from 'Redux/reducers/notifyReducer/actionCreators';
import { openTimerModal } from 'Redux/reducers/timerReducer/actionCreators';
import { setDocumentDefaultTitle } from 'Utils/helpers/setDocumentTitle';

type SidebarPresenter = [() => void, () => void, () => void];

export const usePresenter = (): SidebarPresenter => {
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(openTimerModal());

  const logOutHandler = () => (dispatch: Dispatch<{ type: string }>) => {
    dispatch({ type: 'APP_LOG_OUT' });
    dispatch({ type: 'SET_DEFAULT_ACTIVE_TASK_PROPS' });
    setDocumentDefaultTitle();
  };

  const logOut = () => dispatch(logOutHandler());

  const testErr = () => dispatch(notifyError('Test ERROR'));
  
  return [handleOpen, logOut, testErr];
};
