import { useState } from 'react';
import curry from 'ramda/src/curry';
import clone from 'ramda/src/clone';
import compose from 'ramda/src/compose';
import { isValid } from '../utils/isValid';
import { lengthIsMoreThan5, addColon, checkFirstChar } from '../utils/checkAndChangeValue';

type TPresenter = (initTime: string | undefined) => [(time: string) => void, any];

export const usePresenter: TPresenter = (initTime = '') => {
  const [time, setTime] = useState(isValid(initTime) ? initTime : '');
  const [lastVal, setLastVal] = useState('');

  const changeValueWithCompose = compose(lengthIsMoreThan5, addColon(lastVal), checkFirstChar);

  // const onBlurHandler = (time: string) => time.length < 5 && composedValue(time + '0000');

  const onBlurHandler = (time: string) => {};
  const eventChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const setStateAndReturnNewValue = (value: string) => {
      setLastVal(value);
      setTime(value);

      return value;
    };

    // Сначала проверка на RegExp
    if (isValid(value)) {
      const changedValue = changeValueWithCompose(value);

      if (isValid(changedValue)) {
        e.target.value = setStateAndReturnNewValue(changedValue);
        return e;
      }
    }

    e.target.value = lastVal;
    return e;
  };

  return [onBlurHandler, eventChanger];
};
