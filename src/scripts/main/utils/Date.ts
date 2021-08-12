const ONE_DAY_LENGTH = 86400000;

export const startOfDay = (date: string | number): number => {
  const dateString = new Date(date).toDateString();
  return new Date(dateString).getTime();
};

export const endOfDay = (startOfDay: number) => startOfDay + ONE_DAY_LENGTH;

export const getToday = () => ({
  start: startOfDay(new Date().getTime()),
  stop: endOfDay(startOfDay(new Date().getTime())),
});

export const getCurrentWeek = () => {
  // Номер понедельника на неделе - 1. Надо найти понедельник, а потом прибавить к нему 7 дней.
  const currentDay = startOfDay(new Date().getTime());
  const dayNumber = new Date(currentDay).getDay();
  const result = {
    start: 0,
    stop: 0,
  };

  // Если воскресенье, то из него вычитаем неделю
  if (dayNumber === 0) {
    result.stop = endOfDay(currentDay);
    result.start = result.stop - ONE_DAY_LENGTH * 7;
  } else {
    result.start = currentDay - (dayNumber - 1) * ONE_DAY_LENGTH;
    result.stop = result.start + ONE_DAY_LENGTH * 7;
  }

  return result;
};
export const getLastWeek = ({ start }: { start: number }) => ({
  start: start - ONE_DAY_LENGTH * 7,
  stop: start,
});
export const getCurrentMonth = () => {
  const firstDayOfCurrentMonth = new Date(startOfDay(new Date().getTime())).setDate(1);
  // Найти порядковый номер месяца от текущего дня и увеличить на один
  const firstDayOfNextMonth = new Date(firstDayOfCurrentMonth).setMonth(
    new Date(firstDayOfCurrentMonth).getMonth() + 1
  );

  return {
    start: firstDayOfCurrentMonth,
    stop: firstDayOfNextMonth,
  };
};
export const getLastMonth = ({ start }: { start: number }) => ({
  start: new Date(start).setMonth(new Date(start).getMonth() - 1),
  stop: start,
});
export const getCurrentYear = () => {
  const firstDayOfCurrentMonth = new Date(startOfDay(new Date().getTime())).setDate(1);
  const startOfYear = new Date(firstDayOfCurrentMonth).setMonth(0);
  const endOfYear = new Date(firstDayOfCurrentMonth).setMonth(12);
  return {
    start: startOfYear,
    stop: endOfYear,
  };
};
export const getLastYear = () => {
  const firstDayOfCurrentMonth = new Date(startOfDay(new Date().getTime())).setDate(1);
  const endOfYear = new Date(firstDayOfCurrentMonth).setMonth(0);
  const startOfYear = new Date(firstDayOfCurrentMonth).setMonth(-12);
  return {
    start: startOfYear,
    stop: endOfYear,
  };
};

export const getHoursAndMinutes = (time: string): string => {
  const dateObj = new Date(time);

  if (!Date.parse(time)) return '';

  const hours = dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours();
  const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();

  return `${hours}:${minutes}`;
};

export const calcDuration = (stop: string, start: string): number => {
  return new Date(stop).getTime() - new Date(start).getTime();
};
