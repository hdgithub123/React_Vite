import { useEffect, useState, } from 'react';
import { DebouncedInput } from '../../components/utils/Others/DebouncedInput';

export function SearchFilter({ globalFilter, setGlobalFilter , onhandleKeyDown = null, onhandleOnBlur = null, onhandleonFocus = null, onhandleonDoubleClick = null }) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const handelGlobalFilterOnChange = (value) => {
        setGlobalFilterValue(value)
        let updatedFilter = { ...globalFilter };
        updatedFilter.filterGlobalValue = value
        // Set the global filter with the updated object
        setGlobalFilter(updatedFilter);
    }

    useEffect(() => {
        setGlobalFilterValue(globalFilter.filterGlobalValue)
    }, [globalFilter.filterGlobalValue]);

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

    const handleonDoubleClick = (value)=>{
        if(onhandleonDoubleClick){
            onhandleonDoubleClick(value)
        }
    }

    return <DebouncedInput
        style={{ width: '100%', height: 'auto', padding:'2px', borderRadius:'4px' }}
        onChange={handelGlobalFilterOnChange}
        placeholder={`Search All...`}
        type="text"
        value={(globalFilterValue ?? '') as string}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleonFocus}
        onDoubleClick={handleonDoubleClick}
        debounce = {50}
    />
}



