import { AppError } from 'Utils/Error';

export const asyncCatcher = (fn: any) => {
  return async function (errorHandler: (err: AppError) => void, ...params: any[]) {
    await fn(...params).catch(errorHandler);
  };
};