import { exportExcelTanstack } from "../../../utils/Others/ExportExcell/exportExcelTanstack";

export const ExportExcelTable = ({ data, table , children, exportFile = {name: "Myfile.xlsx", sheetName: "Sheet1", title: null, description: null } }) => {
    const handleExportExcell = () =>{
        if (data.length !== 0) {
            exportExcelTanstack(data, table, exportFile,[80, 10, 3 ]); // [max, min, space] đơn vị tính ký tự = 1 column width của excel
        } else {
            console.log("Please select the rows!")
        }
    }
    return <>
        <div onClick={handleExportExcell}>{children?children:'Export Excell'}</div>
    </>
}

