import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';

// Hàm xuất bảng HTML sang Excel
export function exportTableDomToExcel(tableId, filename) {
    // Lấy bảng từ DOM
    const table = document.getElementById(tableId);
    const ws = XLSX.utils.table_to_sheet(table);

    // Tạo workbook và thêm worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Xuất file Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
}

