import { ColumnVisibilityToggle } from '../ColumnVisibilityToggle/ColumnVisibilityToggle'
import { DropableSelectClick } from "../../../utils/Others/DropSelect/DropableSelect"
import {ExplandingRow} from '../ExplandingRow/ExplandingRow'
import {ExportExcelTable} from '../../Others/ExportExcelTable/ExportExcelTable'
import { getSelectedData } from '../getSelectedData'
import styles from './ButtonPanel.module.css';
import { getDataVisibleColumn } from '../getDataVisibleColumn'
import{getRowModelData} from '../getRowModelData'

import {footerExcelTanstack} from '../../../utils/Others/ExportExcell/ExportExcellComponent/footerExcelTanstack'


export const ButtonPanel = ({ table}) => {
    const filteredUndefinedData = getDataVisibleColumn(getSelectedData(table),table.getState().columnVisibility);
    const filterData = getDataVisibleColumn(getRowModelData(table),table.getState().columnVisibility);
    const hederheder = footerExcelTanstack(table)
    console.log("hederheder",hederheder)
    
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ExplandingRow table={table}></ExplandingRow></div>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportExcelTable data={filteredUndefinedData} table={table} filename='My Select cell.xlsx'>Export Select Cell</ExportExcelTable></div>
                <div className={styles.child_item}><ExportExcelTable data={filterData} table={table}>Export View Cell</ExportExcelTable></div>
            </div>
        </DropableSelectClick>
    </>
}

export const ButtonPanelBasic = ({ table}) => {
    const filteredUndefinedData = getDataVisibleColumn(getSelectedData(table),table.getState().columnVisibility);
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportExcelTable data={filteredUndefinedData} columnsLeafvisible ={table.getAllLeafColumns()} columnVisibility={table.getState().columnVisibility}></ExportExcelTable></div>
            </div>
        </DropableSelectClick>
    </>
}


