const ONE_DAY_LENGTH = 86400000;

export const startOfDay = (date: string | number): number => {
  const [currentDay] = new Date(date).toISOString().split('T');
  return new Date(currentDay).getTime();
};
export const endOfDay = (date: number) => date + ONE_DAY_LENGTH;
export const getCurrentWeek = () => {
  // Номер понедельника на неделе - 1. Надо найти понедельник, а потом прибавить к нему 7 дней.
  const currentDay = startOfDay(new Date().getTime());
  const monday = currentDay - (new Date(currentDay).getDay() - 1) * ONE_DAY_LENGTH; // Получаем начало дня ПН
  const sunday = monday + ONE_DAY_LENGTH * 7; // Это начало след понедельника (по сути конец воскресенья)

  return {
    start: monday,
    stop: sunday,
  };
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
