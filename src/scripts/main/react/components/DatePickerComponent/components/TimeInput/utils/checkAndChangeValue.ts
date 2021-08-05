import curry from 'ramda/src/curry';
import { checkLength } from 'Utils/helpers/checkLength';

export const checkFirstChar = (value: string) => (Number(value[0]) > 2 ? (value = '2') : value);

export const lengthIsMoreThan5 = (value: string) => (value.length > 5 ? value.substring(0, 5) : value);
export const addColon = curry((lastVal: string, value: string) => {
  if (checkLength(value, 2) && !checkLength(lastVal, 3) && value.indexOf(':') === -1) {
    value = value + ':';
  }
  return value;
});