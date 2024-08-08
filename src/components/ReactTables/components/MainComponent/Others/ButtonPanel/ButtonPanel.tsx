import { ColumnVisibilityToggle } from '../ColumnVisibilityToggle/ColumnVisibilityToggle'
import { DropableSelectClick } from "../../../utils/Others/DropSelect/DropableSelect"
import {ExplandingRow} from '../ExplandingRow/ExplandingRow'
import styles from './ButtonPanel.module.css';

export const ButtonPanel = ({ table }) => {
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ExplandingRow table={table}></ExplandingRow></div>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
            </div>
        </DropableSelectClick>
    </>
}


