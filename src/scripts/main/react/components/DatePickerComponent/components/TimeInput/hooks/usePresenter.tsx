import { useState } from 'react';
import { isValid } from './../isValid';
import { compose } from 'Utils/helpers/fp';
import { createDeepCopy } from 'Utils/helpers/createDeepCopy';

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
    if (checkLength(value, 2) && !checkLength(lastVal, 3) && value.indexOf(':') === -1) {
      value = value + ':';
    }
    return value;
  };

  const checkValid = (value: string) => {
    if (isValid(value)) checkValueLength(value);
  };

  const checkValueLength = (value: string) => {
    if (value.length > 5) return false;
    setValue(value);
  };

  const setValue = (value: string): void => {
    setLastVal(value);
    setTime(value);
    onTimeChangeHandler(value);
  };

  const onTimeChangeHandler = (value: string | undefined) => {
    if (value && value.length === 5 && onTimeChange !== undefined) {
      onTimeChange(value);
    }
  };

  const onChange = compose(checkValid, addColon, checkFirstChar, createDeepCopy);

  const onChangeHandler = (value: string) => {
    if (value === time) return;
    onChange(value);
  };

  return [time, onChangeHandler];
};
