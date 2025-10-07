import moment from 'moment';

const defaultDateFormat = 'MM/DD/Y';

export function formateDate(date: string, format: string = '') {
  if (!date) return '';

  const dateAsString = date.toString();
  if (!moment(dateAsString).isValid() || dateAsString.length < 8) return '';

  if (format) {
    return moment(dateAsString).format(format);
  }
  return moment(dateAsString).format(defaultDateFormat);
}
