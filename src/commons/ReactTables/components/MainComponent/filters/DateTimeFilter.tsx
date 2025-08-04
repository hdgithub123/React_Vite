import { useState, useRef, useEffect } from 'react';
import { DebouncedInput } from '../../utils/Others/DebouncedInput';
import MultiSelectFilter from './MultiSelectFilter';

function DateTimeFilter({ column }) {
    const [filterFn, setFilterFn] = useState('');
    const [columnFilterValue, setcolumnFilterValue] = useState('');
    const [multilShow, setMultilShow] = useState(false);

    useEffect(() => {
       switch (filterFn) {
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
            case 'multiSelectFilter':
                setMultilShow(true)
                break;
            default:
                column.columnDef.filterFn = EqualsDateTime;
        }
    }, [filterFn]);

    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        setMultilShow(false)
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
            {!multilShow && <DebouncedInput
                style={{ width: 'calc(100% - 35px)', marginRight: '2px' }}
                onChange={handelOnChange}
                placeholder={`Search...`}
                type="datetime-local"
                value={(columnFilterValue ?? '') as string}
            // debounce = {800}
            />}
            {multilShow && <MultiSelectFilter column={column}></MultiSelectFilter>}
            <select style={{ width: '33px' }} value={filterFn} onChange={handleFilterChange}>
                <option value="multiSelectFilter" title="Multi Select">M</option>
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
    return cellValue !== null && cellValue !== '' && cellValue !== undefined && cellValue;
}

const EmptyDateTime = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue === null || cellValue === '' || cellValue === undefined || !cellValue;

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


