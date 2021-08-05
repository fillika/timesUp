import curry from 'ramda/src/curry';
//@ts-ignore
import __ from 'ramda/src/__';

export const useRamda = () => {
  const aPlusB = curry((a: number, b: number) => a + b);
  const a: (a: number) => number = aPlusB(__, 2);
  console.log(__);
  console.log(a(2));
};
