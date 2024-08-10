import { ColumnVisibilityToggle } from '../ColumnVisibilityToggle/ColumnVisibilityToggle'
import { DropableSelectClick } from "../../../utils/Others/DropSelect/DropableSelect"
import {ExplandingRow} from '../ExplandingRow/ExplandingRow'
import {ExportExcelTable} from '../../Others/ExportExcelTable/ExportExcelTable'

import { getSelectedData } from '../getSelectedData'
import styles from './ButtonPanel.module.css';
import { getDataVisibleColumn } from '../getDataVisibleColumn'

export const ButtonPanel = ({ table}) => {
    // const filteredUndefinedData = getDataVisibleColumn(getSelectedData(table),table.getState().columnVisibility);
    const filteredUndefinedData = table.getRowModel().rows
    console.log("getRowModel",filteredUndefinedData)
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ExplandingRow table={table}></ExplandingRow></div>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportExcelTable data={filteredUndefinedData} columns={table.getAllColumns()}></ExportExcelTable></div>
            </div>
        </DropableSelectClick>
    </>
}


