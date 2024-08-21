import { useState, useRef, useEffect } from 'react';
import {DebouncedInput} from '../../utils/Others/DebouncedInput';

function DateTimeFilter({ column }) {
    const [filterFn, setFilterFn] = useState('');
    const [columnFilterValue, setcolumnFilterValue] = useState('');
    useEffect(() => {
        setFilterFn('EqualsDate');
        column.columnDef.filterFn = EqualsDateTime;
    }, []);

    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        switch (e.target.value) {
            case 'EqualsDateTime':
                column.columnDef.filterFn = EqualsDateTime;
                break;
            case 'weakEqualsDateTime':
                column.columnDef.filterFn = weakEqualsDateTime;
                break;
            case 'weakDateTime':
                column.columnDef.filterFn = weakDateTime;
                break;
            case 'GreaterEqualsDateTime':
                column.columnDef.filterFn = GreaterEqualsDateTime;
                break;
            case 'GreaterDateTime':
                column.columnDef.filterFn = GreaterDateTime;
                break;
            case 'DifferentDateTime':
                column.columnDef.filterFn = DifferentDateTime;
                break;
            case 'EmptyDateTime':
                column.columnDef.filterFn = EmptyDateTime;
                break;
            case 'ExistsDateTime':
                column.columnDef.filterFn = ExistsDateTime;
                break;
            default:
                column.columnDef.filterFn = e.target.value;
        }
        if (e.target.value === "EmptyDateTime") {
            column.setFilterValue("0001-01-01 00:00")
        } else if (columnFilterValue) {
            column.setFilterValue(columnFilterValue);
        } else {
            column.setFilterValue(undefined); // or handle the empty case as needed
        }
    };

    function handelOnChange(value) {
        setcolumnFilterValue(value)
        column.setFilterValue(value) //ok đưa giá trị vào ô filter value
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DebouncedInput
                style={{ width: 'calc(100% - 35px)', marginRight: '2px' }}
                onChange={handelOnChange}
                placeholder={`Search...`}
                type="datetime-local"
                value={(columnFilterValue ?? '') as string}
            // debounce = {800}
            />

            <select style={{ width: '33px' }} value={filterFn} onChange={handleFilterChange}>
                <option value="EqualsDateTime" title="Equal">=</option>
                <option value="weakEqualsDateTime" title="Weak Equal">{'≤'}</option>
                <option value="weakDateTime" title="Weak">{'<'}</option>
                <option value="GreaterEqualsDateTime" title="Greater Equal">{'≥'}</option>
                <option value="GreaterDateTime" title="Greater">{'>'}</option>
                <option value="DifferentDateTime" title="Different">{'≠'}</option>
                <option value="EmptyDateTime" title="Empty">∅</option>
                <option value="ExistsDateTime" title="Exists">∃</option>
            </select>
        </div>

    )

}

export default DateTimeFilter;

const ExistsDateTime = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue !== null && cellValue !== '';
}

const EmptyDateTime = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue === null || cellValue === '';

}

const EqualsDateTime = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() === dateValue.getTime();
    }

    return false;
};


const weakEqualsDateTime = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() <= dateValue.getTime();
    }

    return false;
};

const weakDateTime = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() < dateValue.getTime();
    }

    return false;
};


const GreaterEqualsDateTime = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() >= dateValue.getTime();
    }

    return false;
};

const GreaterDateTime = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() > dateValue.getTime();
    }

    return false;
};

const DifferentDateTime = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() != dateValue.getTime();
    }

    return false;
};


