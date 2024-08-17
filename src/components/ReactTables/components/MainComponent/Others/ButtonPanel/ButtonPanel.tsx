import { ColumnVisibilityToggle } from '../ColumnVisibilityToggle/ColumnVisibilityToggle'
import { DropableSelectClick } from "../../../utils/Others/DropSelect/DropableSelect"
import {ExplandingRow} from '../ExplandingRow/ExplandingRow'
import {ExportFile} from '../../Others/ExportExcelTable/ExportFile'
import styles from './ButtonPanel.module.css';

export const ButtonPanel = ({ table}) => {
    console.log("table.getRowModel().rows",table.getRowModel().rows)
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ExplandingRow table={table}></ExplandingRow></div>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportFile table={table}></ExportFile></div>
            </div>
        </DropableSelectClick>
    </>
}

export const ButtonPanelBasic = ({ table}) => {
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportFile table={table}></ExportFile></div>
            </div>
        </DropableSelectClick>
    </>
}


