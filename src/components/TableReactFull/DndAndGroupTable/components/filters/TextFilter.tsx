import { useState, useRef } from 'react';

function TextFilter({ column }) {
    const [filterFn, setFilterFn] = useState('includesString');
    const FilterValue = useRef(null);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);

        switch (e.target.value) {
            case 'NotIncludesString':
                column.columnDef.filterFn = NotIncludesString;
                break;
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
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <input
                type="text"
                style={{ width: 'calc(100% - 32px)', marginRight: '2px' }}
                value={column.getFilterValue() || ''}
                onChange={handelOnChange}
                placeholder='Search...'
            />
            <select style={{ width: '30px' }} value={filterFn} onChange={handleFilterChange}>
                <option value="includesString" title="Includes String">∈</option>
                <option value="NotIncludesString" title="Does Not Include String">∉</option>
                {/* <option value="includesStringSensitive" title="Includes String Case Sensitive">∈S</option> */}
                <option value="equalsString" title="Equals String">=</option>
                <option value="startWithString" title="Starts With String">⭲</option>
                <option value="endWithString" title="Ends With String">⭰</option>
            </select>
        </div>

    )

}

export default TextFilter;

// Các hàm FilterFn

const NotIncludesString = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Convert the cell value and the filter value to strings for comparison
    const cellValueStr = cellValue.toString().toLowerCase();
    const filterValueStr = value.toString().toLowerCase();

    return !cellValueStr.includes(filterValueStr);
};


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

