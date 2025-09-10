export const numberToPrice = (value: number) => {
  const format = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(value);
  return format;
};

export const transformDate = (value: string) => {
  const [day, month, year] = value.split('/');
  return `${year}-${month}-${day}`;
};

export const dateISO = (value: string) => {
  const today = new Date(value);
  const yyyy = today.getFullYear();
  let mm: number | string = today.getMonth() + 1; // Months start at 0!
  let dd: number | string = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  return formattedToday;
};

export const dateTimeISO = (value: string) => {
  const today = new Date(value);
  const yyyy = today.getFullYear();
  let mm: number | string = today.getMonth() + 1; // Months start at 0!
  let dd: number | string = today.getDate();
  let hh: number | string = today.getHours();
  let mn: number | string = today.getMinutes();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (hh < 10) hh = '0' + hh;
  if (mn < 10) mn = '0' + mn;

  const formattedToday = dd + '/' + mm + '/' + yyyy + ' , ' + hh + ':' + mn;
  return formattedToday;
};
