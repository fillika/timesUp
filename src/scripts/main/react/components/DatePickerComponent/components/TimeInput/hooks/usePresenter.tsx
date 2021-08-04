import { useState } from 'react';
import curry from 'lodash/fp/curry';
import compose from 'lodash/fp/compose';
import { isValid } from '../utils/isValid';
import { createDeepCopy } from 'Utils/helpers/createDeepCopy';
import { checkAndChangeValue } from '../utils/checkAndChangeValue';
import { checkValueValidation } from '../utils/checkValueValidation';

type TPresenter = (initTime: string | undefined) => [string, (arg: string) => void];

export const usePresenter: TPresenter = (initTime = '') => {
  const [time, setTime] = useState(isValid(initTime) ? initTime : '');
  const [lastVal, setLastVal] = useState('');

  const changeState = (value: string) => (setLastVal(value), setTime(value));
  const composedValue = compose(checkValueValidation(changeState), checkAndChangeValue(lastVal), createDeepCopy);
  const onChangeHandler = curry((time: string, value: string) => (value !== time ? composedValue(value) : 0));

  return [time, onChangeHandler(time)];
};
