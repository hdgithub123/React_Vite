import { useEffect, useState, } from 'react';
import { DebouncedInput } from '../../components/utils/Others/DebouncedInput';
import styles from './SearchFilter.module.css';

export function SearchFilter({ globalFilter, setGlobalFilter ,cssStyleTextFilter = null , onhandleKeyDown = null, onhandleOnBlur = null, onhandleonFocus = null, onhandleonDoubleClick = null }) {
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
        className={styles.textbox}
        style={cssStyleTextFilter}
        id='idGloalSearch'
        onChange={handelGlobalFilterOnChange}
        placeholder={`Search...`}
        type="text"
        value={(globalFilterValue ?? '') as string}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
        onFocus={handleonFocus}
        onDoubleClick={handleonDoubleClick}
        debounce = {200}
    />
}



