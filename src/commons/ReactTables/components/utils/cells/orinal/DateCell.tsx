import {formatUsDate,formatVnDate,formatDate } from '../../Others/fomatCell'

export const DateUsCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatUsDate(dateValue);
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
};

export const DateVnCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatVnDate(dateValue);
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
};

export const DateCell = ({ getValue, row, column, table }) => {
  const dateValue = getValue();
  const formattedDate = formatDate(dateValue);
    return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
};
