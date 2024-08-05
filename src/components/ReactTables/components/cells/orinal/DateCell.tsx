
export const DateUsCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatUsDate(dateValue);
  if (row.getIsGrouped()) {
    return ''
  }
  else {
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
  }
};

export const DateVnCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatVnDate(dateValue);
  if (row.getIsGrouped()) {
    return ''
  }
  else {
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
  }
};

export const DateCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatDate(dateValue);
  if (row.getIsGrouped()) {
    return ''
  }
  else {
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
  }
};



const formatDate = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }
  const locale = navigator.language;
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};



const formatVnDate = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};


const formatUsDate = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};
