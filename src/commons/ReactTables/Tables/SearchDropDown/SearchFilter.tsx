import { useState, } from 'react';
import { DebouncedInput } from '../../components/utils/Others/DebouncedInput';

export function SearchFilter({ globalFilter, setGlobalFilter , onhandleKeyDown = null, onhandleOnBlur = null, onhandleonFocus = null }) {
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

    const handleOnBlur = (value)=>{
        if(onhandleOnBlur){
            onhandleOnBlur(value)
        }
    }

    const handleonFocus = (value)=>{
        if(onhandleonFocus){
            onhandleonFocus(value)
        }
    }

    return <DebouncedInput
        style={{ width: 'calc(100% - 6px)', marginRight: '2px' }}
        onChange={handelGlobalFilterOnChange}
        placeholder={`Search All...`}
        type="text"
        value={(globalFilterValue ?? '') as string}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleonFocus}
        debounce = {50}
    />
}



