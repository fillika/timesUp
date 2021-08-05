import { useState } from 'react';
import curry from 'ramda/src/curry';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import { isValid } from '../utils/isValid';
import { lengthIsMoreThan5, addColon, checkFirstChar } from '../utils/checkAndChangeValue';
import { useRamda } from './useRamda';

type TPresenter = (initTime: string | undefined) => [string, (arg: string) => void];

export const usePresenter: TPresenter = (initTime = '') => {
  const [time, setTime] = useState(isValid(initTime) ? initTime : '');
  const [lastVal, setLastVal] = useState('');

  useRamda();

  const changeState = (value: string) => (setLastVal(value), setTime(value));
  const checkValueValidation = curry(
    (setState: typeof changeState, value: string) => isValid(value) && setState(value)
  )(changeState);

  const composedValue = compose<string, string, string, string, string, false | void>(
    checkValueValidation,
    addColon(lastVal),
    lengthIsMoreThan5,
    checkFirstChar,
    clone
  );
  
  const onChangeHandler = curry((time: string, value: string) => (value !== time ? composedValue(value) : 0));

  return [time, onChangeHandler(time)];
};
