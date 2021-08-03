import { useState } from 'react';
import { isValid } from './../isValid';
import { createDeepCopy } from 'Utils/helpers/createDeepCopy';
import flow from 'lodash/fp/flow';
import curry from 'lodash/fp/curry';

type TPresenter = (
  initTime: string | undefined,
  onTimeChange: (value: string) => void
) => [string, (arg: string) => void];

export const usePresenter: TPresenter = (initTime = '', onTimeChange) => {
  const [time, setTime] = useState(isValid(initTime) ? initTime : '');
  const [lastVal, setLastVal] = useState('');

  const checkFirstChar = (val: string) => {
    if (Number(val[0]) > 2) val = '2'; // Первый символ - максимум 2
    return val;
  };

  // Проверка на длину
  const checkLength = (val: string | [], number: number) => (val.length === number ? true : false);

  const addColon = (value: string) => {
    if (value.length > 5) return false;
    if (checkLength(value, 2) && !checkLength(lastVal, 3) && value.indexOf(':') === -1) {
      value = value + ':';
    }
    return value;
  };

  const changeState = (value: string) => {
    setLastVal(value);
    setTime(value);
    onTimeChangeHandler(value);
  };

  const checkValid = curry((fn: typeof changeState, value: string) => isValid(value) && fn(value));

  const onTimeChangeHandler = (value: string) => {
    if (value.length === 5 && onTimeChange !== undefined) {
      onTimeChange(value);
    }
  };

  const onChange = flow(createDeepCopy, checkFirstChar, addColon, checkValid(changeState));

  const onChangeHandler = (value: string) => {
    if (value === time) return;
    onChange(value);
  };

  return [time, onChangeHandler];
};
