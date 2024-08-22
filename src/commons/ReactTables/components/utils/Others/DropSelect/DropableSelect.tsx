import styles from './DropableSelect.module.css';

import { useState, useEffect, useRef } from 'react';


export const DropableSelectClick = ({ droptitle, children, position = 'top'  }) => {
    let childStyle
    switch (position) {
        case 'top':
            childStyle = styles.child_Top
            break;
        case 'botton':
            childStyle = styles.child_Bottom
            break;
        case 'left':
            childStyle = styles.child_Left
            break;
        case 'right':
            childStyle = styles.child_Right
            break;
        default:
            childStyle = styles.child_Bottom
        }  
    
    const [open, setOpen] = useState(false);
    const handelClick = () => {
        setOpen(!open)
    }
    const handleMouseLeave = () => {
        setOpen(false);
    };

    return (
        <div className={styles.general}>
            <div className={styles.title} onClick={handelClick}> {droptitle} </div>
            {open ? <div onMouseLeave={handleMouseLeave} className={childStyle}> {children} </div> : null}
        </div>
    );
}



export const DropableSelectHover = ({ droptitle, children, position = 'top' }) => {
    let childStyle
    switch (position) {
        case 'top':
            childStyle = styles.child_hover_Top
            break;
        case 'botton':
            childStyle = styles.child_hover_Bottom
            break;
        case 'left':
            childStyle = styles.child_hover_Left
            break;
        case 'right':
            childStyle = styles.child_hover_Right
            break;
        default:
            childStyle = styles.child_hover_Bottom
    }

    return (
        <div className={styles.general_hover}>
            <div className={styles.title_hover}> {droptitle} </div>
            <div className={childStyle}> {children} </div>
        </div>
    );
}

