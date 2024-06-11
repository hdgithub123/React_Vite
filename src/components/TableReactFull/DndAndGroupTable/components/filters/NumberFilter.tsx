import { useState, useRef, useEffect } from 'react';

function NumberFilter({ column }) {
    const [filterFn, setFilterFn] = useState('');

    useEffect(() => {
        setFilterFn('EqualsNumber');
        column.columnDef.filterFn = EqualsNumber;
    }, []);

    const FilterValue = useRef(null);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        switch (e.target.value) {
            case 'EqualsNumber':
                column.columnDef.filterFn = EqualsNumber;
                break;
            case 'weakEqualsNumber':
                column.columnDef.filterFn = weakEqualsNumber;
                break;
            case 'weakNumber':
                column.columnDef.filterFn = weakNumber;
                break;
            case 'GreaterEqualsNumber':
                column.columnDef.filterFn = GreaterEqualsNumber;
                break;
            case 'GreaterNumber':
                column.columnDef.filterFn = GreaterNumber;
                break;
            case 'DifferentNumber':
                column.columnDef.filterFn = DifferentNumber;
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
                type="text"
                value={column.getFilterValue() || ''}
                onChange={handelOnChange}
                placeholder='Search...'
            />
            <select value={filterFn} onChange={handleFilterChange}>
                <option value="EqualsNumber">=</option>
                <option value="weakEqualsNumber">{'≤'}</option>
                <option value="weakNumber">{'<'}</option>
                <option value="GreaterEqualsNumber">{'≥'}</option>
                <option value="GreaterNumber">{'>'}</option>
                <option value="DifferentNumber">{'≠'}</option>
            </select>
        </>

    )

}

export default NumberFilter;


const EqualsNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const numericValue = Number(value);

    if (!isNaN(cellValue) && !isNaN(numericValue)) {
        return cellValue === numericValue;
    }

    return false;
};

const weakEqualsNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const numericValue = Number(value);

    if (!isNaN(cellValue) && !isNaN(numericValue)) {
        return cellValue <= numericValue;
    }

    return false;
};

const weakNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const numericValue = Number(value);

    if (!isNaN(cellValue) && !isNaN(numericValue)) {
        return cellValue < numericValue;
    }

    return false;
};


const GreaterEqualsNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const numericValue = Number(value);

    if (!isNaN(cellValue) && !isNaN(numericValue)) {
        return cellValue >= numericValue;
    }

    return false;
};

const GreaterNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const numericValue = Number(value);

    if (!isNaN(cellValue) && !isNaN(numericValue)) {
        return cellValue > numericValue;
    }

    return false;
};

const DifferentNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const numericValue = Number(value);

    if (!isNaN(cellValue) && !isNaN(numericValue)) {
        return cellValue != numericValue;
    }

    return false;
};


