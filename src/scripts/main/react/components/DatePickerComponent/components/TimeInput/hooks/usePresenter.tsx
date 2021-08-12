import { useState, useContext } from 'react';
import curry from 'ramda/src/curry';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import { isValid } from '../utils/isValid';
import { lengthIsMoreThan5, addColon, checkFirstChar } from '../utils/checkAndChangeValue';

type TPresenter = (initTime: string | undefined) => [string, (arg: string) => void, (time: string) => void];

export const usePresenter: TPresenter = (initTime = '') => {
  const [time, setTime] = useState(isValid(initTime) ? initTime : '');
  const [lastVal, setLastVal] = useState('');

  const checkValidAndChangeState = (setState: typeof changeState, value: string) => isValid(value) && setState(value);
  const changeState = (value: string) => (setLastVal(value), setTime(value));
  const checkValueValidation = curry(checkValidAndChangeState)(changeState);

  const composedValue = compose<string, string, string, string, string, false | void>(
    checkValueValidation,
    lengthIsMoreThan5,
    addColon(lastVal),
    checkFirstChar,
    clone
  );

  const onChangeCurried = curry((time: string, value: string) => (value !== time ? composedValue(value) : 0));
  const onChangeHandler = onChangeCurried(time);

  const onBlurHandler = (time: string) => time.length < 5 && composedValue(time + '0000');

  return [time, onChangeHandler, onBlurHandler];
};
