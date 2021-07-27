import {
  getCurrentMonth,
  getCurrentWeek,
  getCurrentYear,
  getLastMonth,
  getLastWeek,
  getLastYear,
  getToday,
} from 'Utils/Date';
import { DayVariable } from './types';

export const parseDate = (date: DayVariable): { start: number | string; stop: number | string } => {
  switch (date) {
    case 'Today':
      return getToday();

    case 'This week':
      return getCurrentWeek();

    case 'Last week':
      return getLastWeek(getCurrentWeek());

    case 'This month':
      return getCurrentMonth();

    case 'Last month':
      return getLastMonth(getCurrentMonth());

    case 'This year':
      return getCurrentYear();

    case 'Last year':
      return getLastYear();

    default:
      return {
        start: '',
        stop: '',
      };
  }
};
