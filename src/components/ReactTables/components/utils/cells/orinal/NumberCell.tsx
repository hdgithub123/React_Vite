import {formatVnNumber,formatUsNumber,formatNumber} from './fomatCell'

export const NumberVnCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20 }) => {
    return <div style={{ textAlign: 'right' }}>{formatVnNumber(initialValue, minFractionDigits, maxFractionDigits)}</div>;
};

export const NumberUsCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20 }) => {
    return <div style={{ textAlign: 'right' }}>{formatUsNumber(initialValue, minFractionDigits, maxFractionDigits)}</div>;
};

export const NumberCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20 }) => {
    return <div style={{ textAlign: 'right' }}>{formatNumber(initialValue, minFractionDigits, maxFractionDigits)}</div>;
};