import React from 'react';

import { formateDate } from './formateDate';

/**
  Date comparator function is to be used for AG Grid with rowData only.

  {
    headerName: '',
    field: '',
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: (filterLocalDateAtMidnight, cellValue) =>
        DateComparator(filterLocalDateAtMidnight, cellValue),
    },
  }
 */

export const DateComparator = (
  filterLocalDateAtMidnight: Date,
  cellValue: string
) => {
  const dateAsString = formateDate(cellValue, 'YYYY-MM-DD');
  if (!dateAsString) {
    return 0;
  }

  const dateParts = dateAsString.split('-');
  // DateFormat is YYYY-MM-DD
  const year = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const day = Number(dateParts[2]);

  const cellDate = new Date(year, month, day);
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  } else if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
  return 0;
};

/**
  Used for not breaking words while wrapping.
 */

export const WordBreakRenderer = (value: string) => {
  return <div style={{ wordBreak: 'break-word' }}>{value}</div>;
};
