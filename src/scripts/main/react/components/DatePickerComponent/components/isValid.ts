export const isValid = (val: string) => {
  // const regexp = /^\d{0,2}?\:?\d{0,2}$/;
  const regExp = new RegExp('([0][0-9]|[1][0-9]|[2][0-3]):?([0-5][0-9]){0,2}', 'gm');
  // /^\d{0,2}:?\d{0,2}/gm
  // /([0][0-9]|[1][0-9]|[2][0-3]):?([0-5][0-9]){0,2}/gm
  const [hoursStr, minutesStr] = val.split(':');

  if (!regExp.test(val)) {
    return false;
  }

  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  const isValidHour = (hour: number) => Number.isInteger(hour) && hour >= 0 && hour < 24;
  const isValidMinutes = (minutes: number) =>
    (Number.isInteger(minutes) && hours >= 0 && hours < 24) || Number.isNaN(minutes);

  if (!isValidHour(hours) || !isValidMinutes(minutes)) {
    return false;
  }

  if (minutes < 10 && Number(minutesStr[0]) > 5) {
    return false;
  }

  const valArr = val.indexOf(':') !== -1 ? val.split(':') : [val];

  // check mm and HH
  if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
    return false;
  }

  if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
    return false;
  }

  return true;
};
