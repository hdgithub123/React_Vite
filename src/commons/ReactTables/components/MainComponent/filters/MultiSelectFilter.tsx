import { useState, useMemo, useRef, useEffect } from 'react';
import useOnClickOutside from '../../utils/Others/useOnClickOutside'


function MultiSelectFilter({ column }) {
    const allValues = useMemo(() => Array.from(column.getFacetedUniqueValues().keys()), [column]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState(() => column.getFilterValue() || []);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    column.columnDef.filterFn = multiSelectFn;
    // Hook xử lý click ra ngoài
    useOnClickOutside(containerRef, () => setIsOpen(false));

    const filteredValues = useMemo(() => {
        return allValues.filter(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, allValues]);

    function handleCheckboxChange(e) {
        const value = e.target.value;
        const isChecked = e.target.checked;

        let updatedValues;
        if (isChecked) {
            updatedValues = [...selectedValues, value];
        } else {
            updatedValues = selectedValues.filter(v => v !== value);
        }

        setSelectedValues(updatedValues);
        column.setFilterValue(updatedValues.length > 0 ? updatedValues : undefined);

    }


    const handleOnchange = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value)
    };

    const handleInputClick = () =>{
        setIsOpen(true);
    }

    return (
        <div ref={containerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, overflow: 'visible', }}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleOnchange}
                onMouseDown={handleInputClick}
                style={{ width: '100%', marginRight: '2px' }}
            />

            {isOpen && (

                <div
                    style={{
                        position: 'absolute',
                        top: "100%",
                        left: 0,
                        width: '200%',
                        height: '200px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 20,
                        padding: '4px',
                        display: 'flex',
                        flexDirection:'column', 
                        justifyContent: 'center'
                       
                    }}
                >
                    {filteredValues.length > 0 ? (
                        <div style={{ width: '100%', overflow: 'auto', height: '200px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', height: '10px' }}>
                            <tbody>
                                {filteredValues.map(value => (
                                    <tr key={value} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '4px', width: '30px', textAlign: 'center' }}>
                                            <input
                                                type="checkbox"
                                                value={value}
                                                checked={selectedValues.includes(value)}
                                                onChange={handleCheckboxChange}
                                            />
                                        </td>
                                        <td style={{ padding: '4px', textAlign: 'left' }}>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    ) : (
                        <div style={{ fontStyle: 'italic', color: '#888',height: '180px' }}>No data select</div>
                    )}
                    {/* Nút xóa dữ liệu đã chọn */}
                    <button
                        style={{
                            marginTop: '8px',
                            width: '100%',
                            padding: '6px',
                            background: 'gray',
                            color: 'white',
                            border: '1px solid black',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setSelectedValues([]);
                            column.setFilterValue(undefined);
                        }}
                        disabled={selectedValues.length === 0}
                    >
                        Remove Select
                    </button>
                </div>
            )}
        </div>
    );
}




export default MultiSelectFilter;

const multiSelectFn = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    if (!value || value.length === 0) return true;
    return value.includes(cellValue);
};



