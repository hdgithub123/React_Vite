export const DateTimeVnCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatVnDateTime(dateValue);
  if (row.getIsGrouped()) {
    return ''
  }
  else {
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
  }
};

export const DateTimeCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatDateTime(dateValue);
  if (row.getIsGrouped()) {
    return ''
  }
  else {
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
  }
};

export const DateTimeUsCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatUsDateTime(dateValue);
  if (row.getIsGrouped()) {
    return ''
  }
  else {
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
  }
};


const formatDateTime = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  const locale = navigator.language; // Lấy ngôn ngữ và thiết lập khu vực của máy tính

  const datePart = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    //   second: '2-digit',
    hourCycle: 'h23' // Đảm bảo sử dụng định dạng 24 giờ
  }).format(parsedDate);

  return `${datePart} ${timePart}`;
};

const formatVnDateTime = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  const datePart = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    //   second: '2-digit',
    hourCycle: 'h23' // Đảm bảo sử dụng định dạng 24 giờ
  }).format(parsedDate);

  return `${datePart} ${timePart}`;
};

const formatUsDateTime = (date) => {
  if (!date || date === "") {
    return '';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  const datePart = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    //   second: '2-digit',
    hourCycle: 'h23' // Đảm bảo sử dụng định dạng 24 giờ
  }).format(parsedDate);

  return `${datePart} ${timePart}`;
};