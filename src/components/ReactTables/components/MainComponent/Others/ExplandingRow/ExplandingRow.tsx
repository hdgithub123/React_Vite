import { useState,useRef} from 'react';

export const ExplandingRow = ({ table }) => {
    const [showExpaned, setShowExpaned] = useState('Collapse All');
    const Explanded = useRef(false);
    const handleClick = ()=>{
        Explanded.current = !Explanded.current
        table.setExpanded(Explanded.current);
        if (Explanded.current) {
            setShowExpaned('Collapse All')
        }
        else{
            setShowExpaned('Expand All')
        } 
    }

    return <>
        <div onClick={handleClick}>{showExpaned}</div>

    </>

}