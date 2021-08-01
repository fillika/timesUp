const ONE_DAY_LENGTH = 86400000;

export const startOfDay = (date: string | number): number => {
  // const [currentDay] = new Date(date).toISOString().split('T');
  // return new Date(currentDay).getTime();
  const dateString = new Date(date).toDateString();
  return new Date(dateString).getTime();
};
export const endOfDay = (date: number) => date + ONE_DAY_LENGTH;
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

  if (dayNumber === 0) {
    result.stop = new Date(1627765200000 + 86400000).getTime();
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
