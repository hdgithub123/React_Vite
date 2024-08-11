import { exportExcelTanstack } from "../../../utils/Others/ExportExcell/exportExcelTanstack";

export const ExportExcelTable = ({ data, columns, columnsLeafvisible}) => {
    // const headers = extractHeaders(columns);
    const filename = 'MyFile.xlsx';
    const sheetName = 'Sheet1';
    const handleExportExcell = () =>{
        console.log("columns",columns)
        console.log("data",data)
        exportExcelTanstack(data, filename, sheetName, columns, columnsLeafvisible);
    }
    
    return <>
        <div onClick={handleExportExcell}>Export Excell</div>
    </>

}



