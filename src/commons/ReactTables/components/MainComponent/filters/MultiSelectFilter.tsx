import { useState, useMemo, useRef, useEffect } from 'react';
import useOnClickOutside from '../../utils/Others/useOnClickOutside'
import useAutoAdjustAbsolutePosition from '../../utils/Others/useAutoAdjustChildPosition'
import { DebouncedInput } from '../../utils/Others/DebouncedInput';

function MultiSelectFilter({ column }) {
    const [allValues, setAllValues] = useState(Array.from(column.getFacetedUniqueValues().keys()));
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState(() => column.getFilterValue() || []);
    // const [selectedValues, setSelectedValues] = useState([]);
    // const [filteredValues, setFilteredValues] = useState(allValues);
    const [filteredValues, setFilteredValues] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const showRef = useRef(null);

    column.columnDef.filterFn = multiSelectFn;

    // Hook xử lý click ra ngoài
    useOnClickOutside(containerRef, () => setIsOpen(false));

    // Cập nhật filteredValues khi searchTerm hoặc allValues thay đổi
    useEffect(() => {
        const filtered = allValues.filter(value => {
            if (!value || String(value).trim() === '') return false; // loại bỏ giá trị rỗng
            return String(value).toLowerCase().includes(String(searchTerm).toLowerCase());
        });
        setFilteredValues(filtered);
    }, [searchTerm, allValues]);



    useEffect(() => {
        const newAllValues = Array.from(column.getFacetedUniqueValues().keys())
        if (JSON.stringify(newAllValues) !== JSON.stringify(allValues)) {
            setAllValues(newAllValues);
        }
    }, [column.getFacetedUniqueValues().keys()]);

    useEffect(() => {
        column.setFilterValue(selectedValues);
    }, [selectedValues]);



    function handleCheckboxChange(e) {
        const value = e.target.value;
        const isChecked = e.target.checked;

        let updatedValues;
        if (isChecked) {
            updatedValues = [...selectedValues, value];
        } else {
            updatedValues = selectedValues.filter(v => v !== value);
        }
        console.log("selectedValues", selectedValues)
        setSelectedValues(updatedValues);
    }

    const handleOnchange = (e) => {
        setSearchTerm(e);
    };

    const handleInputClick = () => {
        setIsOpen(true);
    };

    useAutoAdjustAbsolutePosition(showRef, isOpen);
    return (
        <div ref={containerRef} style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, overflow: 'visible', }}>
            <DebouncedInput
                style={{ width: '100%', marginRight: '2px', border: selectedValues.length > 0 ? '2px solid red' : '1px solid gray', borderRadius: '2px' }}
                onChange={handleOnchange}
                placeholder={selectedValues.length > 0 ? 'Selected' : `Multi Search...`}
                onMouseDown={handleInputClick}
                type="text"
                value={(searchTerm ?? '') as string}
            // debounce = {800}
            />
            {isOpen && (

                <div
                    ref={showRef}
                    style={{
                        position: 'absolute',
                        top: "100%",
                        left: 0,
                        width: '300%',
                        height: '200px',
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        zIndex: 20,
                        padding: '4px',
                        display: 'flex',
                        flexDirection: 'column',
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
                                                    checked={String(selectedValues).includes(value)}
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
                        <div style={{ fontStyle: 'italic', color: '#888', height: '180px' }}>No data select</div>
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
                            cursor: selectedValues.length > 0 ? 'pointer' : 'not-allowed'
                        }}
                        onClick={() => {
                            setSelectedValues([]);
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
    const cellValue = String(row.getValue(columnId));
    
    if (!value || value.length === 0) return true;
    if(!cellValue || cellValue.length === 0) return false;
    return String(value).includes(cellValue);
};

