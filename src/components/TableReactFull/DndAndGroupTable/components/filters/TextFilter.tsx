import { useState, useRef } from 'react';

function TextFilter({ column }) {
    const [filterFn, setFilterFn] = useState('includesString');
    const FilterValue = useRef(null);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);

        switch (e.target.value) {
            case 'startWithString':
                column.columnDef.filterFn = startWithString;
                break;
            case 'endWithString':
                column.columnDef.filterFn = endWithString;
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
                <option value="includesString">Include</option>
                <option value="includesStringSensitive">Include Sensitive</option>
                <option value="equalsString">Equals String</option>
                <option value="startWithString" >Start with</option>
                <option value="endWithString" >End with</option>
            </select>
        </>

    )

}

export default TextFilter;

// Các hàm FilterFn

const startWithString = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    // Convert both the cell value and the filter value to strings
    const cellValueStr = String(cellValue);
    const valueStr = String(value);

    // Perform the startsWith check
    return cellValueStr.toLowerCase().startsWith(valueStr.toLowerCase());
};


const endWithString = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    // Convert both the cell value and the filter value to strings
    const cellValueStr = String(cellValue);
    const valueStr = String(value);

    // Perform the endsWith check
    return cellValueStr.toLowerCase().endsWith(valueStr.toLowerCase());
};

