import curry from 'lodash/fp/curry';
import { isValid } from './isValid';

type TSetState = (value: string) => void;

export const checkValueValidation = curry<TSetState, string, void>((setState, value) => isValid(value) && setState(value));
