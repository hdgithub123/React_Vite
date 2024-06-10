import { useState, useRef,useEffect } from 'react';

function DateFilter({ column }) {
    const [filterFn, setFilterFn] = useState('');
    useEffect(() => {
        setFilterFn('EqualsDate');
        column.columnDef.filterFn = EqualsDate;
    }, []);

    const FilterValue = useRef(null);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
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
            default:
                column.columnDef.filterFn = e.target.value;
        }

        if (FilterValue.current) {
            column.setFilterValue(FilterValue.current);
        } else {
            column.setFilterValue(undefined); // or handle the empty case as needed
        }
    };

    function handelOnChange(e) {
        column.setFilterValue(e.target.value) //ok đưa giá trị vào ô filter value
        FilterValue.current = e.target.value
    }
    return (
        <>
            <input
                type="date"
                value={column.getFilterValue() || ''}
                onChange={handelOnChange}
                placeholder='Search...'
            />
            <select value={filterFn} onChange={handleFilterChange}>
                <option value="EqualsDate">=</option>
                <option value="weakEqualsDate">{'<='}</option>
                <option value="weakDate">{'<'}</option>
                <option value="GreaterEqualsDate">{'>='}</option>
                <option value="GreaterDate">{'>'}</option>
            </select>
        </>

    )

}

export default DateFilter;


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


