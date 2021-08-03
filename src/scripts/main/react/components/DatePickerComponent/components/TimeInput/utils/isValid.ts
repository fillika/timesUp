export const isValid = (value: string) => {
  const regExp = new RegExp('^(2[0-3]|[0-1][0-9]|[0-2])?:?([0-5][0-9]|[0-5])?$', 'gm');
  const test = regExp.test(value);

  if (!test) return false;

  return true;
};
