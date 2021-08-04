import { useState } from 'react';
import curry from 'ramda/src/curry';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import { isValid } from '../utils/isValid';
import { checkAndChangeValue } from '../utils/checkAndChangeValue';
import { checkValueValidation } from '../utils/checkValueValidation';

type TPresenter = (initTime: string | undefined) => [string, (arg: string) => void];

export const usePresenter: TPresenter = (initTime = '') => {
  const [time, setTime] = useState(isValid(initTime) ? initTime : '');
  const [lastVal, setLastVal] = useState('');

  const changeState = (value: string) => (setLastVal(value), setTime(value));
  const composedValue = compose<string, string, string, false | void>(
    checkValueValidation(changeState),
    checkAndChangeValue(lastVal),
    clone
  );
  const onChangeHandler = curry((time: string, value: string) => (value !== time ? composedValue(value) : 0));

  return [time, onChangeHandler(time)];
};
