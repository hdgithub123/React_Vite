
function RangeFilter({ column }) {
    const uniqueValues = Array.from(column.getFacetedUniqueValues().keys());
    function handelOnChange(e) {
        column.setFilterValue(e.target.value) //ok đưa giá trị vào ô filter value
    }
    return (
        <select style={{ width: '100%', justifyContent: 'center'}} value={column.getFilterValue() || ''} onChange={handelOnChange}>
            <option value="">All</option>
            {uniqueValues.map(value => (
                //dynamically generated select options from faceted values feature
                <option value={value} key={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}

export default RangeFilter;