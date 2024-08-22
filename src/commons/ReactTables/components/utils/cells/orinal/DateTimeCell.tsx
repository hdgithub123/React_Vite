import {formatVnDateTime,formatUsDateTime,formatDateTime} from './fomatCell'


export const DateTimeVnCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatVnDateTime(dateValue);
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
};

export const DateTimeCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatDateTime(dateValue);
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
};

export const DateTimeUsCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatUsDateTime(dateValue);
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
};


