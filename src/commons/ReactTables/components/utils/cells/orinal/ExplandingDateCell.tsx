export const ExplandingDateCell = ({ getValue, row, column, table }) => {
    const dateValue = getValue();
    const formattedDate = formatDate(dateValue);
    if (formattedDate ==='Invalid date') {
        return ''
    } else{
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