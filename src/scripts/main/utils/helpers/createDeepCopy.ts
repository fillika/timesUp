export const createDeepCopy = <T, Y>(data: T): Y => JSON.parse(JSON.stringify(data));
