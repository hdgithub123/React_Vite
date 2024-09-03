import {formatVnNumber,formatUsNumber,formatNumber} from '../../Others/fomatCell'

export const NumberVnCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20, option = {}}) => {
    return <div style={{ textAlign: 'right' }}>{formatVnNumber(initialValue, minFractionDigits, maxFractionDigits, option)}</div>;
};

export const NumberUsCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20, option = {} }) => {
    return <div style={{ textAlign: 'right' }}>{formatUsNumber(initialValue, minFractionDigits, maxFractionDigits,option)}</div>;
};

export const NumberCell = ({ initialValue, row, column, table, minFractionDigits = 0, maxFractionDigits = 20, option = {}, locale= null }) => {
    return <div style={{ textAlign: 'right' }}>{formatNumber(initialValue, minFractionDigits, maxFractionDigits, option ,locale )}</div>;
};

// note:
// Value of option:
// 1.decimal-- default { style: 'decimal' } example: 1234.56 → 1,234.56
// 2. currency: { style: 'currency', currency: 'USD' } example: 1234.56 → $1,234.56 (với currency: 'USD')
// 3. percent: { style: 'percent' } example:  0.123 → 12%
// 4. unit: { style: 'unit', unit: 'kg' } example: 1234.56 → 1,234.56 kg