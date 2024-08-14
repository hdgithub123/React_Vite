import { ColumnVisibilityToggle } from '../ColumnVisibilityToggle/ColumnVisibilityToggle'
import { DropableSelectClick } from "../../../utils/Others/DropSelect/DropableSelect"
import {ExplandingRow} from '../ExplandingRow/ExplandingRow'
import {ExportExcelTable} from '../../Others/ExportExcelTable/ExportExcelTable'
import { getSelectedData } from '../getSelectedData'
import styles from './ButtonPanel.module.css';
import { getDataVisibleColumn } from '../getDataVisibleColumn'
import{getRowModelData} from '../getRowModelData'

export const ButtonPanel = ({ table}) => {
    const filteredUndefinedData = getDataVisibleColumn(getSelectedData(table),table.getState().columnVisibility);
    const filterData = getDataVisibleColumn(getRowModelData(table),table.getState().columnVisibility);
    console.log("table",table)
   // console.log("table.getHeaderGroups()",table.getHeaderGroups()[2].headers[0].column.columnDef.footer())
    console.log("filteredUndefinedData",filteredUndefinedData)
    console.log("getSelectedData(table)",getSelectedData(table))
   // console.log("table.getFooterGroups()[0].headers[0].column.columnDef là:",table.getFooterGroups()[0].headers[2].column.columnDef.footer())
    return <>
        <DropableSelectClick
            droptitle={<div>::</div>}
            position='bottom'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ExplandingRow table={table}></ExplandingRow></div>
                <div className={styles.child_item}><ColumnVisibilityToggle table={table}></ColumnVisibilityToggle></div>
                <div className={styles.child_item}><ExportExcelTable data={filteredUndefinedData} columnsLeafvisible ={table.getAllLeafColumns()} columnVisibility={table.getState().columnVisibility}></ExportExcelTable></div>
                <div className={styles.child_item}><ExportExcelTable data={filterData} columnsLeafvisible ={table.getAllLeafColumns()} columnVisibility={table.getState().columnVisibility}></ExportExcelTable></div>
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


