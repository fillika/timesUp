import curry from 'lodash/fp/curry';
import { isValid } from './isValid';

export const checkValueValidation = curry(
  (setState: (value: string) => void, value: string) => isValid(value) && setState(value)
);
