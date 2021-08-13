import { useState } from 'react';
import compose from 'ramda/src/compose';

import { isValid } from '../utils/isValid';
import { lengthIsMoreThan5, addColon, checkFirstChar } from '../utils/checkAndChangeValue';

type TPresenter = () => [
  (e: React.FocusEvent<HTMLInputElement>) => string,
  (e: React.ChangeEvent<HTMLInputElement>) => React.ChangeEvent<HTMLInputElement>
];

export const usePresenter: TPresenter = () => {
  const [lastVal, setLastVal] = useState('');

  const changeValueWithCompose = compose(lengthIsMoreThan5, addColon(lastVal), checkFirstChar);
  const setStateAndReturnNewValue = (value: string) => {
    setLastVal(value);
    return value;
  };

  const blurChanger = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 5) {
      const changedValue = changeValueWithCompose(e.target.value + '0000');
      return setStateAndReturnNewValue(changedValue);
    }

    return e.target.value;
  };

  const eventChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

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

  return [blurChanger, eventChanger];
};
