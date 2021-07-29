export const compose =
  (...fns: Array<any>) =>
  (argument: any) =>
    fns.reduceRight((prev, next) => next(prev), argument);

export const pipe =
  (...fns: Array<(arg: any) => any>) =>
  (argument: any) =>
    fns.reduce((prev, next) => next(prev), argument);

export const curry = (fn: any) =>
  function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...args2: any[]) => curried.apply(this, args.concat(args2));
  };

export const createDeepCopy = <T, Y>(data: T): Y => JSON.parse(JSON.stringify(data));
