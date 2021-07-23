import { time } from 'Utils/Time';
import { TaskType } from 'Types/tasks';

// Utils
export const getTotalDayTime = (tasks: TaskType[]): string => {
  let result = 0;
  tasks.forEach(el => (result += el.duration));
  return time.countTotalTime(result);
};

export const toLocalDateString = (dateISO: string): string => {
  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(dateISO).getDate();
  const month = new Date(dateISO).getMonth();
  const year = new Date(dateISO).getFullYear();
  return `${date} ${monthsList[month]} ${year}`;
};