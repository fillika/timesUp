import { useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { changeTaskDateByID } from 'Redux/reducers/taskReducer/middlewares';
import { getJWTToken } from 'Utils/helpers/JWTHadlers';
import { TFormState } from '../types';
import { TDispatchDatePickerData } from 'App/components/DatePickerComponent';

type THandlersHook = [boolean, () => void, () => void, (data: TDispatchDatePickerData) => void];

export const useHandlers = (
  data: TFormState,
  setActive: Dispatch<SetStateAction<boolean>> | undefined
): THandlersHook => {
  const [isOpened, setIsOpened] = useState(false);
  const token = getJWTToken();
  const dispatch = useDispatch();

  const handleOpen = () => setIsOpened(true);
  const handleClose = () => setIsOpened(false);

  const onClickHandler = () => {
    if (data.time === undefined) {
      handleOpen();
    } else {
      if (setActive) setActive(prev => !prev);
    }
  };

  const sumbitHadler = (data: TDispatchDatePickerData) => {
    if (token) dispatch(changeTaskDateByID(token, data));
  };

  return [isOpened, handleClose, onClickHandler, sumbitHadler];
};
