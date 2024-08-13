import { exportExcelTanstack } from "../../../utils/Others/ExportExcell/exportExcelTanstack";

export const ExportExcelTable = ({ data, columns, columnsLeafvisible, columnVisibility}) => {
    const filename = 'MyFile.xlsx';
    const sheetName = 'Sheet1';
    const handleExportExcell = () =>{
        exportExcelTanstack(data, filename, sheetName, columns, columnsLeafvisible, columnVisibility, [80, 10, 2 ]); // [max, min, space]
    }
    return <>
        <div onClick={handleExportExcell}>Export Excell</div>
    </>
}
