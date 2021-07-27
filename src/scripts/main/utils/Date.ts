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
export const getLastWeek = ({ start, stop }: { start: number; stop: number }) => ({
  start: start - ONE_DAY_LENGTH * 7,
  stop: start,
});
