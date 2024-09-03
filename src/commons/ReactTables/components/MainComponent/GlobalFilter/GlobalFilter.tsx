import { useState, } from 'react';
import { DebouncedInput } from '../../utils/Others/DebouncedInput';

export function GlobalFilter({ globalFilter, setGlobalFilter , onhandleKeyDown = null }) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const handelGlobalFilterOnChange = (value) => {
        setGlobalFilterValue(value)
        let updatedFilter = { ...globalFilter };
        updatedFilter.filterGlobalValue = value
        // Set the global filter with the updated object
        setGlobalFilter(updatedFilter);
    }

    const handleKeyDown = (value) => {
        if(onhandleKeyDown){
            onhandleKeyDown(value)
        }
    }


    return <DebouncedInput
        style={{ width: 'calc(100% - 6px)', marginRight: '2px' }}
        onChange={handelGlobalFilterOnChange}
        placeholder={`Search All...`}
        type="text"
        value={(globalFilterValue ?? '') as string}
        onKeyDown={handleKeyDown}
    // debounce = {800}
    />
}



