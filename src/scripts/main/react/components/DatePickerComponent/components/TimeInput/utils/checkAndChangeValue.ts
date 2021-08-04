import compose from 'lodash/fp/compose';
import curry from 'lodash/fp/curry';
import { checkLength } from 'Utils/helpers/checkLength';

const checkFirstChar = (value: string) => (Number(value[0]) > 2 ? (value = '2') : value);

const addColon = curry((lastVal: string, value: string) => {
  if (value.length > 5) return value.substring(0, 5);
  if (checkLength(value, 2) && !checkLength(lastVal, 3) && value.indexOf(':') === -1) {
    value = value + ':';
  }
  return value;
});

export const checkAndChangeValue = (lastVal: string) => compose(addColon(lastVal), checkFirstChar);
