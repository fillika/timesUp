export const compose =
  (...fns: Array<any>) =>
  (argument: any) =>
    fns.reduceRight((prev, next) => next(prev), argument);

export const pipe =
  (...fns: Array<(arg: any) => any>) =>
  (argument: any) =>
    fns.reduce((prev, next) => next(prev), argument);

export const createDeepCopy = <T, Y>(data: T): Y => JSON.parse(JSON.stringify(data));
