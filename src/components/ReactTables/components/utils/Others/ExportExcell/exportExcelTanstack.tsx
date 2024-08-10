import * as XLSX from 'xlsx';

/**
 * Chuyển đổi cấu trúc tiêu đề dạng cây thành mảng các hàng tiêu đề
 * @param {Array} columns - Cấu trúc tiêu đề dạng cây.
 * @returns {Array} - Mảng các hàng tiêu đề.
 */
function convertColumnsToHeaders(columns) {
    const headers = [];

    function processColumn(column, rowIndex = 0, colIndex = 0) {
        if (!headers[rowIndex]) headers[rowIndex] = {};
        if (column.header) {
            // Đặt tiêu đề cho cột hiện tại
            headers[rowIndex][colIndex] = column.header;
        }

        if (column.columns && column.columns.length > 0) {
            // Xử lý các cột con
            column.columns.forEach((subColumn, subColIndex) => {
                processColumn(subColumn, rowIndex + 1, subColIndex);
            });
        }
    }

    columns.forEach((column, index) => {
        processColumn(column, 0, index);
    });

    return headers;
}

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



/**
 * Xuất dữ liệu từ JSON sang tệp Excel với nhiều hàng tiêu đề
 * @param {Array} data - Dữ liệu JSON cần xuất.
 * @param {string} filename - Tên tệp Excel xuất ra.
 * @param {string} sheetName - Tên của worksheet trong tệp Excel.
 * @param {Array} column - Tiêu đề của cột, dạng mảng các đối tượng.
 */
export function exportExcelTanstack(data, filename, sheetName, columns) {
    // Tạo worksheet từ dữ liệu JSON
    const ws = XLSX.utils.json_to_sheet(data);
    console.log("columns",columns)
    // Chuyển đổi cấu trúc tiêu đề dạng cây thành mảng các hàng tiêu đề
    const headerRows = convertColumnsToHeaders(columns);
    console.log("headerRows",headerRows)

    // Thêm nhiều hàng tiêu đề vào worksheet
    headerRows.forEach((headerRow, rowIndex) => {
        Object.keys(headerRow).forEach((key, colIndex) => {
            const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
            ws[cellAddress] = { v: headerRow[colIndex], t: 's' }; // 's' cho string
        });
    });

    // Đặt chiều cao hàng tiêu đề (nếu cần)
    ws['!rows'] = headerRows.map(() => ({ hpt: 20 })); // Tùy chỉnh chiều cao hàng nếu cần

    // Tạo workbook mới và thêm worksheet vào đó
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Ghi workbook ra tệp Excel
    XLSX.writeFile(wb, filename);
}
