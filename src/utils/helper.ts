import {WEEKDAYS} from '@src/constants';

export const getWeekdayText = (weekdays: number[]) => {
  return weekdays
    .sort()
    .map(d => WEEKDAYS[d])
    .join(', ');
};
