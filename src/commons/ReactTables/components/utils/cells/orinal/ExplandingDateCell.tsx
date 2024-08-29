import {formatDate } from '../../Others/fomatCell'
export const ExplandingDateCell = ({ getValue, row, column, table }) => {
    const dateValue = getValue();
    const formattedDate = formatDate(dateValue);
    if (formattedDate ==='Invalid date') {
        return ''
    } else{
        return <div style={{ textAlign: 'right' }}>{formattedDate}</div>;
    }
      
};