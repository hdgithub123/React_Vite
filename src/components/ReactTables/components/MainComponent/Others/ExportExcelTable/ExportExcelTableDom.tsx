import {exportTableDomToExcel} from '../../../utils/Others/ExportExcell/exportTableDomToExcel'

export const ExportExcelTableDom = ({}) => {
    const filename = 'MyFileExport.xlsx';
    const tableId = 'React_table_id';
    const handleExportExcell = () =>{
        exportTableDomToExcel(tableId, filename)
    }
    
    return <>
        <div onClick={handleExportExcell}>Export Excell DOM</div>
    </>
}
