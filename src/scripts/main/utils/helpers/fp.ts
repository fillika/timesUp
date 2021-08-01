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

export const maybe = (x: any) => (fn: any) => {
  if (x !== null || x !== undefined || (x !== false && fn)) return maybe(fn(x));
  else maybe(null);
};
