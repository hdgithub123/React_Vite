import  { useState, useRef } from 'react';

function TextFilter({ column }) {
    const [filterFn, setFilterFn] = useState('includesString');
    const FilterValue = useRef(null);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        column.columnDef.filterFn = e.target.value;
        column.setFilterValue(FilterValue.current)
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

      </select>
        </>
        
    )

}

export default TextFilter;


