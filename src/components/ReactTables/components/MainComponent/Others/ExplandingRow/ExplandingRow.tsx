import { useState,useRef} from 'react';

export const ExplandingRow = ({ table }) => {
    const [showExpaned, setShowExpaned] = useState('Expand All');
    const Explanded = useRef(false);
    const handleClick = ()=>{
        Explanded.current = !Explanded.current
        if (Explanded.current) {
            setShowExpaned('Collapse All')
            table.setExpanded(true);
        }
        else{
            setShowExpaned('Expand All')
            table.setExpanded(false);
        } 
    }

    return <>
        <div onClick={handleClick}>{showExpaned}</div>
    </>

}