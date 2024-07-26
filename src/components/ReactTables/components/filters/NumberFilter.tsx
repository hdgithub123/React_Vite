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
            case 'EmptyNumber':
                column.columnDef.filterFn = EmptyNumber;
                break;
            case 'ExistsNumber':
                column.columnDef.filterFn = ExistsNumber;
                break;
            default:
                column.columnDef.filterFn = e.target.value;
        }

        if (e.target.value === "EmptyNumber") {
            column.setFilterValue("Empty")
        } else if (e.target.value === "ExistsNumber"){
            column.setFilterValue("Not Empty")
        }else if (FilterValue.current) {
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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <input
                type="text"
                style={{ width: 'calc(100% - 35px)', marginRight: '2px' }}
                value={column.getFilterValue() || ''}
                onChange={handelOnChange}
                placeholder='Search...'
            />
            <select style={{ width: '33px' }} value={filterFn} onChange={handleFilterChange}>
                <option value="EqualsNumber" title="Equals">=</option>
                <option value="weakEqualsNumber" title="Weak Equals">{'≤'}</option>
                <option value="weakNumber" title="Weak">{'<'}</option>
                <option value="GreaterEqualsNumber" title="Greater Equals" >{'≥'}</option>
                <option value="GreaterNumber" title="Greater" >{'>'}</option>
                <option value="DifferentNumber" title="Different" >{'≠'}</option>
                <option value="EmptyNumber" title="Empty">∅</option>
                <option value="ExistsNumber" title="Exists">∃</option>
            </select>
        </div>

    )

}

export default NumberFilter;

const ExistsNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue !== null && cellValue !== '';

}


const EmptyNumber = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue === null || cellValue === '';

}

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


