import { exportExcelTanstack } from "../../../utils/Others/ExportExcell/exportExcelTanstack";

export const ExportExcelTable = ({ data, columnsLeafvisible, columnVisibility}) => {
    const filename = 'MyFile.xlsx';
    const sheetName = 'Sheet1';
    const handleExportExcell = () =>{
        exportExcelTanstack(data, filename, sheetName, columnsLeafvisible, columnVisibility, [80, 10, 3 ]); // [max, min, space] đơn vị tính ký tự = 1 column width của excel
    }
    return <>
        <div onClick={handleExportExcell}>Export Excell</div>
    </>
}
