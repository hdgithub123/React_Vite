import { useState, } from 'react';
import { DebouncedInput } from '../../utils/Others/DebouncedInput';

export function GlobalFilter({ globalFilter, setGlobalFilter }) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const handelGlobalFilterOnChange = (value) => {
        setGlobalFilterValue(value)
        let updatedFilter = { ...globalFilter };
        updatedFilter.filterGlobalValue = value
        // Set the global filter with the updated object
        setGlobalFilter(updatedFilter);
    }

    return <DebouncedInput
        style={{ width: 'calc(100% - 6px)', marginRight: '2px' }}
        onChange={handelGlobalFilterOnChange}
        placeholder={`Search All...`}
        type="text"
        value={(globalFilterValue ?? '') as string}
    // debounce = {800}
    />
}



