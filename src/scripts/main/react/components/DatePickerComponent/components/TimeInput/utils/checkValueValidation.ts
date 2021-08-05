import curry from 'ramda/src/curry';
import { isValid } from './isValid';

type TSetState = (value: string) => void;

export const checkValueValidation = curry((setState: TSetState, value: string) => isValid(value) && setState(value));
