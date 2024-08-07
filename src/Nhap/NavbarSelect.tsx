import styles from './NavbarSelect.module.css';

import { useState, useEffect, useRef } from 'react';


export const DropableSelect = ({droptitle, children }) =>{
    const [open, setOpen] = useState(false);
    const handelClick = ()=>{
        setOpen(!open)
    }
    return (
        <div className={styles.general}>
            <div className={styles.title} onClick={handelClick}> {droptitle} </div>
            {open? <div className={styles.child}> {children} </div> : null}
        </div>
    );
}

export const DropableSelectHoverRight = ({droptitle, children }) =>{
    return (
        <div className={styles.general_hover_Right}>
            <div className={styles.title_hover_Right}> {droptitle} </div>
            <div className={styles.child_hover_Right}> {children} </div>
        </div>
    );
}

export const DropableSelectHoverbottom = ({droptitle, children }) =>{
    return (
        <div className={styles.general_hover_Bottom}>
            <div className={styles.title_hover_Bottom}> {droptitle} </div>
            <div className={styles.child_hover_Bottom}> {children} </div>
        </div>
    );
}



