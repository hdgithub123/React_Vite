import { useState, useEffect } from 'react';
import {DebouncedInput} from '../../utils/Others/DebouncedInput';
import MultiSelectFilter from './MultiSelectFilter';
function DateFilter({ column }) {
    const [filterFn, setFilterFn] = useState('');
    const [columnFilterValue, setcolumnFilterValue] = useState('');
    const [multilShow, setMultilShow] = useState(false);
    useEffect(() => {
        setFilterFn('EqualsDate');
        column.columnDef.filterFn = EqualsDate;
    }, []);

    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        setMultilShow(false)
        switch (e.target.value) {
            case 'EqualsDate':
                column.columnDef.filterFn = EqualsDate;
                break;
            case 'weakEqualsDate':
                column.columnDef.filterFn = weakEqualsDate;
                break;
            case 'weakDate':
                column.columnDef.filterFn = weakDate;
                break;
            case 'GreaterEqualsDate':
                column.columnDef.filterFn = GreaterEqualsDate;
                break;
            case 'GreaterDate':
                column.columnDef.filterFn = GreaterDate;
                break;
            case 'DifferentDate':
                column.columnDef.filterFn = DifferentDate;
                break;
            case 'EmptyDate':
                column.columnDef.filterFn = EmptyDate;
                break;
            case 'ExistsDate':
                column.columnDef.filterFn = ExistsDate;
                break;
            case 'multiSelectFilter':
                setMultilShow(true)
                break;
            default:
                column.columnDef.filterFn = e.target.value;
        }


        if (e.target.value === "EmptyDate") {
            column.setFilterValue("0001-01-01")
        } else if (e.target.value === "ExistsDate") {
            column.setFilterValue("0002-01-01")
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
            {!multilShow &&  <DebouncedInput
                style={{ width: 'calc(100% - 35px)', marginRight: '2px' }}
                onChange={handelOnChange}
                placeholder={`Search...`}
                type="date"
                value={(columnFilterValue ?? '') as string}
            // debounce = {800}
            />}
            {multilShow && <MultiSelectFilter column={column}></MultiSelectFilter>}
            <select style={{ width: '33px' }} value={filterFn} onChange={handleFilterChange}>
                 <option value="multiSelectFilter" title="Multi Select">M</option>
                <option value="EqualsDate" title="Equal">=</option>
                <option value="weakEqualsDate" title="Weak Equal">{'≤'}</option>
                <option value="weakDate" title="Weak">{'<'}</option>
                <option value="GreaterEqualsDate" title="Greater Equal">{'≥'}</option>
                <option value="GreaterDate" title="Greater">{'>'}</option>
                <option value="DifferentDate" title="Different">{'≠'}</option>
                <option value="EmptyDate" title="Empty">∅</option>
                <option value="ExistsDate" title="Exists">∃</option>
            </select>
        </div>

    )

}

export default DateFilter;

const ExistsDate = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue !== null && cellValue !== '';

}


const EmptyDate = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue === null || cellValue === '';
}

const EqualsDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() === dateValue.getTime();
    }

    return false;
};


const weakEqualsDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() <= dateValue.getTime();
    }

    return false;
};

const weakDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() < dateValue.getTime();
    }

    return false;
};


const GreaterEqualsDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() >= dateValue.getTime();
    }

    return false;
};

const GreaterDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() > dateValue.getTime();
    }

    return false;
};


const DifferentDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() != dateValue.getTime();
    }

    return false;
};


