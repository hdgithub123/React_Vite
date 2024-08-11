import * as XLSX from 'xlsx';

/**
 * Chuyển đổi cấu trúc tiêu đề dạng cây thành mảng các hàng tiêu đề
 * @param {Array} columns - Cấu trúc tiêu đề dạng cây.
 * @returns {Array} - Mảng các hàng tiêu đề.
 */


function convertColumnsToHeaders(columns, columnsLeafVisible) {
    // const headers = [
    //     ['Name', 'Name', 'Info', 'Info', 'Info', 'Info'],
    //     ['First Name', 'Last Name', 'Age', 'Visits', 'Status', 'Profile Progress']
    // ]; mau


    const header = columnsLeafVisible.map(item => {

        if (typeof item.columnDef.header === 'string') {
         
            return item.columnDef.header;
        } else {
            return item.id;
        }

    });

    // can xu ly tiep cac bac 0, 1.. trên bậc lá

    const headers = [
        header,
    ]

    return headers;
}




/**
 * Xuất dữ liệu từ JSON sang tệp Excel với nhiều hàng tiêu đề
 * @param {Array} data - Dữ liệu JSON cần xuất.
 * @param {string} filename - Tên tệp Excel xuất ra.
 * @param {string} sheetName - Tên của worksheet trong tệp Excel.
 * @param {Array} column - Tiêu đề của cột, dạng mảng các đối tượng.
 */
export function exportExcelTanstack(data, filename, sheetName, columns, columnsLeafvisible) {
    const headers = convertColumnsToHeaders(columns, columnsLeafvisible);
    console.log("headers", headers)
    const workbook = XLSX.utils.book_new();

    // Tạo worksheet với nhiều hàng tiêu đề
    const wsWithHeaders = XLSX.utils.aoa_to_sheet(headers);

    // Thêm dữ liệu vào worksheet (bắt đầu từ dòng đầu tiên trống sau tiêu đề)
    XLSX.utils.sheet_add_json(wsWithHeaders, data, { header: [], skipHeader: true, origin: -1 });

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, wsWithHeaders, sheetName);

    // Ghi workbook ra file
    XLSX.writeFile(workbook, filename);


}
