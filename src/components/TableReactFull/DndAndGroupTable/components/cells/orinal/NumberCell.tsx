export const NumberVnCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20 }) => {
    return <div style={{ textAlign: 'right' }}>{formatVnNumber(initialValue, minFractionDigits, maxFractionDigits)}</div>;
};

export const NumberUsCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20 }) => {
    return <div style={{ textAlign: 'right' }}>{formatUsNumber(initialValue, minFractionDigits, maxFractionDigits)}</div>;
};

export const NumberCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20 }) => {
    return <div style={{ textAlign: 'right' }}>{formatNumber(initialValue, minFractionDigits, maxFractionDigits)}</div>;
};



const formatNumber = (number, minFractionDigits, maxFractionDigits) => {
    if (!number || number === "") {
        return '';
    }
    const locale = navigator.language; 
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
    }).format(number);
};

const formatUsNumber = (number, minFractionDigits, maxFractionDigits) => {
    if (!number || number === "") {
        return '';
    }
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
    }).format(number);
};

const formatVnNumber = (number, minFractionDigits, maxFractionDigits) => {
    if (!number || number === "") {
        return '';
    }
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
    }).format(number);
};