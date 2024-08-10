import XLSX from 'xlsx';

/**
 * Xuất dữ liệu từ JSON sang tệp Excel với nhiều hàng tiêu đề
 * @param {Array} data - Dữ liệu JSON cần xuất.
 * @param {string} filename - Tên tệp Excel xuất ra.
 * @param {string} sheetName - Tên của worksheet trong tệp Excel.
 * @param {Array} column - Tiêu đề của cột, dạng mảng các đối tượng.
 */

export function exportExcel(data, filename, sheetName, column) {
    // Tạo worksheet từ dữ liệu JSON
    const ws = XLSX.utils.json_to_sheet(data);

    // Thêm nhiều hàng tiêu đề vào worksheet
    if (column && column.length > 0) {
        // Xác định hàng tiêu đề và chèn vào worksheet
        column.forEach((headerRow, rowIndex) => {
            Object.keys(headerRow).forEach((header, colIndex) => {
                const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
                ws[cellAddress] = { v: headerRow[header], t: 's' }; // 's' cho string
            });
        });

        // Đặt chiều cao hàng tiêu đề (nếu cần)
        ws['!rows'] = column.map(() => ({ hpt: 20 })); // Tùy chỉnh chiều cao hàng nếu cần

        // Cập nhật tiêu đề đầu tiên cho worksheet
        // Xoá hàng tiêu đề mặc định nếu có
        const range = XLSX.utils.decode_range(ws['!ref']);
        if (range.s.r === 0 && range.e.r > 0) {
            range.s.r = 0;
            ws['!ref'] = XLSX.utils.encode_range(range);
        }
    }

    // Tạo workbook mới và thêm worksheet vào đó
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Ghi workbook ra tệp Excel
    XLSX.writeFile(wb, filename);
}


