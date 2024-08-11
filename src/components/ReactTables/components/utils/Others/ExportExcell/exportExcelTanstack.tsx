import * as XLSX from 'xlsx';

/**
 * Chuyển đổi cấu trúc tiêu đề dạng cây thành mảng các hàng tiêu đề
 * @param {Array} columns - Cấu trúc tiêu đề dạng cây.
 * @returns {Array} - Mảng các hàng tiêu đề.
 */
// function convertColumnsToHeaders(columns) {
//     const headers = [];

//     function processColumn(column, rowIndex = 0, colIndex = 0) {
//         if (!headers[rowIndex]) headers[rowIndex] = {};
//         if (column.header) {
//             // Đặt tiêu đề cho cột hiện tại
//             headers[rowIndex][colIndex] = column.header;
//         }

//         if (column.columns && column.columns.length > 0) {
//             // Xử lý các cột con
//             column.columns.forEach((subColumn, subColIndex) => {
//                 processColumn(subColumn, rowIndex + 1, subColIndex);
//             });
//         }
//     }

//     columns.forEach((column, index) => {
//         processColumn(column, 0, index);
//     });

//     return headers;
// }

// function convertColumnsToHeaders(columns) {
//     const headers = [];

//     function processColumn(column, rowIndex = 0, colIndex = 0) {
//         if (!headers[rowIndex]) headers[rowIndex] = {};
//         if (column.columnDef && column.columnDef.header) {
//             // Đặt tiêu đề cho cột hiện tại
//             headers[rowIndex][colIndex] = column.columnDef.header;
//         }

//         if (column.columns && column.columns.length > 0) {
//             // Xử lý các cột con
//             column.columns.forEach((subColumn, subColIndex) => {
//                 processColumn(subColumn, rowIndex + 1, subColIndex);
//             });
//         }
//     }

//     columns.forEach((column, index) => {
//         processColumn(column, 0, index);
//     });

//     return headers;
// }

// function convertColumnsToHeaders(columns) {
//     const headers = [];
//     const columnMapping = {}; // Để lưu trữ mối quan hệ cột con và cột cha
//     const leafKeys = {}; // Để lưu trữ các khóa của các bậc lá

//     function processColumn(column, rowIndex = 0, colIndex = 0) {
//         if (!headers[rowIndex]) headers[rowIndex] = {};

//         if (column.columnDef && column.columnDef.header) {
//             // Đặt tiêu đề cho cột hiện tại
//             headers[rowIndex][colIndex] = column.columnDef.header;
//             columnMapping[`${rowIndex}-${colIndex}`] = column;

//             // Nếu là bậc lá, lưu khóa
//             if (column.columns.length === 0) {
//                 leafKeys[column.id] = colIndex;
//             }
//         }

//         if (column.columns && column.columns.length > 0) {
//             // Xử lý các cột con
//             column.columns.forEach((subColumn, subColIndex) => {
//                 processColumn(subColumn, rowIndex + 1, subColIndex);
//             });
//         }
//     }

//     // Xử lý từng cột cấp trên cùng
//     columns.forEach((column, index) => {
//         processColumn(column, 0, index);
//     });

//     // Tạo mảng tiêu đề cuối cùng
//     const finalHeadersArray = [];
//     const maxDepth = Math.max(...Object.keys(columnMapping).map(key => parseInt(key.split('-')[0], 10)));

//     for (let depth = 0; depth <= maxDepth; depth++) {
//         const newRow = {};
//         Object.keys(headers[depth] || {}).forEach(colIndex => {
//             const key = Object.keys(leafKeys).find(key => leafKeys[key] === parseInt(colIndex, 10));
//             if (key) {
//                 newRow[key] = headers[depth][colIndex];
//             }
//         });
//         finalHeadersArray.push(newRow);
//     }

//     return finalHeadersArray;
// }

function convertColumnsToHeaders(columns, columnsLeafVisible) {

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
