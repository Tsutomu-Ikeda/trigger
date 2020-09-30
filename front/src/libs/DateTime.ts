import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';

dayjs.extend(utcPlugin);

export const convertDateTime = (date: string | Date) =>
  dayjs(date).format('YYYY/MM/DD HH:mm');

export const convertShortDateTime = (date: string | Date) =>
  dayjs(date).format('M/D H:mm');

export const convertDurationDateTime = (start: string | Date, end: string | Date) => {
  if (dayjs(start).isSame(end, 'date'))
    return `${convertDateTime(start)} - ${dayjs(end).format('HH:mm')}`;
  else
    return `${convertDateTime(start)} - ${convertShortDateTime(end)}`;
}