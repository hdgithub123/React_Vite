import { getDataVisibleColumn } from "../getDataVisibleColumn";
import { getRowModelData } from "../getRowModelData";
import { DropableSelectHover } from '../../../utils/Others/DropSelect/DropableSelect'
import { ExportExcelTable } from "./ExportExcelTable";
import { getSelectedData } from "../getSelectedData";
import styles from './ExportFile.module.css';

export const ExportFile = ({ table }) => {
    const filteredUndefinedData = getDataVisibleColumn(getSelectedData(table), table.getState().columnVisibility);
    const filterData = getDataVisibleColumn(getRowModelData(table), table.getState().columnVisibility);
    return <>
        <DropableSelectHover
            droptitle={<div style={{ width: '100%', display: 'flex' }} >Export File</div>}
            position='right'
        >
            <div className={styles.child}>
                <div className={styles.child_item}><ExportExcelTable data={filteredUndefinedData} table={table} filename='My Select cell.xlsx'>Export Select Cell</ExportExcelTable></div>
                <div className={styles.child_item}><ExportExcelTable data={filterData} table={table}>Export View Cell</ExportExcelTable></div>
            </div>
        </DropableSelectHover>
    </>



}