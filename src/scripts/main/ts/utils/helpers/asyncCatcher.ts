export const asyncCatcher = (fn: any) => {
  return async function (errorHandler: (err: Error) => any, ...params: any[]) {
    await fn(...params).catch(errorHandler);
  };
};