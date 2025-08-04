import { useState, useMemo, useRef, useEffect } from 'react';
import { flexRender } from '@tanstack/react-table';
import useOnClickOutside from '../../utils/Others/useOnClickOutside';
import useAutoAdjustAbsolutePosition from '../../utils/Others/useAutoAdjustChildPosition';
import { DebouncedInput } from '../../utils/Others/DebouncedInput';

function MultiSelectFilter({ column }) {
  const [allValues, setAllValues] = useState(Array.from(column.getFacetedUniqueValues().keys()));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(() => column.getFilterValue() || []);
  const [filteredValues, setFilteredValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const showRef = useRef(null);

  column.columnDef.filterFn = multiSelectFn;

  useEffect(() => {
    const filtered = allValues.filter(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredValues(filtered);
  }, [searchTerm, allValues]);

  useEffect(() => {
    const newAllValues = Array.from(column.getFacetedUniqueValues().keys());
    if (JSON.stringify(newAllValues) !== JSON.stringify(allValues)) {
      setAllValues(newAllValues);
    }
  }, [column.getFacetedUniqueValues().keys()]);

  useEffect(() => {
    column.setFilterValue(selectedValues);
  }, [selectedValues]);

  const handleCheckboxChange = e => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const normalizedValue = value === ''? false : value;
    const updatedValues = isChecked
      ? [...selectedValues, normalizedValue]
      : selectedValues.filter(v => v !== normalizedValue);
    setSelectedValues(updatedValues);
  };

  const handleSelectValue = (selectedValues, value) => {
    if (String(value) === '0') return selectedValues.includes('0');
    if (value === '') return selectedValues.includes(false);
    if (!value || value === null || value === undefined) return selectedValues.includes(false);
    return selectedValues.includes(String(value));
  };

  useOnClickOutside(containerRef, () => setIsOpen(false));
  useAutoAdjustAbsolutePosition(showRef, isOpen);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        overflow: 'visible',
      }}
    >
      <DebouncedInput
        style={{
          width: '100%',
          marginRight: '2px',
          border: selectedValues.length > 0 ? '2px solid red' : '1px solid gray',
          borderRadius: '2px',
        }}
        onChange={setSearchTerm}
        placeholder={selectedValues.length > 0 ? 'Selected' : 'Multi Search...'}
        onMouseDown={() => setIsOpen(true)}
        type="text"
        value={searchTerm}
      />

      {isOpen && (
        <div
          ref={showRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '200%',
            height: '200px',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            zIndex: 20,
            padding: '4px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {filteredValues.length > 0 ? (
            <div style={{ width: '100%', overflow: 'auto', height: '200px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {filteredValues.map(value => {
                    const fakeContext = {
                      getValue: () => value,
                      column,
                      table:null,
                      row: undefined,
                    };

                    return (
                      <tr key={value} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '4px', width: '30px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            value={value ?? ''}
                            checked={handleSelectValue(selectedValues, value)}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                        <td style={{ padding: '4px', textAlign: 'left' }}>
                          {flexRender(column.columnDef.cell, fakeContext)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ fontStyle: 'italic', color: '#888', height: '180px' }}>No data select</div>
          )}

          <button
            style={{
              marginTop: '8px',
              width: '100%',
              padding: '6px',
              background: 'gray',
              color: 'white',
              border: '1px solid black',
              borderRadius: '4px',
              cursor: selectedValues.length > 0 ? 'pointer' : 'not-allowed',
            }}
            onClick={() => setSelectedValues([])}
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

const multiSelectFn = (row, columnId, valueFilterArray) => {
  const cellValue = row.getValue(columnId);
  const stringCellValue = String(cellValue)
  if (!valueFilterArray || valueFilterArray.length === 0) return true;
  if (!cellValue || cellValue.length === 0 || cellValue === undefined || cellValue === null || cellValue === '') return valueFilterArray.includes(false);
  return valueFilterArray.includes(stringCellValue);
};
