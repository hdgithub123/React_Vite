import { ColumnVisibilityToggle } from '../ColumnVisibilityToggle/ColumnVisibilityToggle'
import { DropableSelectClick } from "../../../utils/Others/DropSelect/DropableSelect"
import {ExplandingRow} from '../ExplandingRow/ExplandingRow'
import {ExportFile} from '../../Others/ExportExcelTable/ExportFile'
import styles from './ButtonPanel.module.css';

export const ButtonPanel = ({ table , exportFileName = "Myfile.xlsx"}) => {
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
              {table.getCanSomeRowsExpand()?  <div className={styles.child_item}><ExplandingRow table={table}></ExplandingRow></div>:null}
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportFile table={table} exportFileName ={exportFileName}></ExportFile></div>
            </div>
        </DropableSelectClick>
    </>
}



