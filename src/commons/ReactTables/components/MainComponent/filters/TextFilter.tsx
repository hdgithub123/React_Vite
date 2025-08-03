import { useState } from 'react';
import { DebouncedInput } from '../../utils/Others/DebouncedInput';
import MultiSelectFilter from './MultiSelectFilter';


function TextFilter({ column }) {
    const [filterFn, setFilterFn] = useState('includesString');
    const [columnFilterValue, setcolumnFilterValue] = useState('');
    const [multilShow, setMultilShow] = useState(false);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        setMultilShow(false)
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
            case 'EmptyString':
                column.columnDef.filterFn = EmptyString;
                break;
            case 'ExistsString':
                column.columnDef.filterFn = ExistsString;
                break;
            case 'multiSelectFilter':
                setMultilShow(true)
                break;
            default:
                column.columnDef.filterFn = e.target.value;
        }

        if (e.target.value === "EmptyString") {
            column.setFilterValue("Empty")
        } else if (e.target.value === "ExistsString") {
            column.setFilterValue("Not Empty")
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
                type="text"
                value={(columnFilterValue ?? '') as string}
            // debounce = {800}
            />}
            {multilShow && <MultiSelectFilter column={column}></MultiSelectFilter>}
            <select style={{ width: '33px' }} value={filterFn} onChange={handleFilterChange}>
                <option value="multiSelectFilter" title="Multi Select">M</option>
                <option value="includesString" title="Includes String">∈</option>
                <option value="NotIncludesString" title="Does Not Include String">∉</option>
                {/* <option value="includesStringSensitive" title="Includes String Case Sensitive">∈S</option> */}
                <option value="equalsString" title="Equals String">=</option>
                <option value="startWithString" title="Starts With String">⭲</option>
                <option value="endWithString" title="Ends With String">⭰</option>
                <option value="EmptyString" title="Empty">∅</option>
                <option value="ExistsString" title="Exists">∃</option>
            </select>
        </div>

    )

}

export default TextFilter;

// Các hàm FilterFn


const ExistsString = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue !== null && cellValue !== '' && cellValue !== undefined && cellValue;

}

const EmptyString = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    // Return true if the cell value is null or an empty string, otherwise return false
    return cellValue === null || cellValue === '' || cellValue === undefined || !cellValue ;

}


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

