import * as XLSX from 'xlsx-js-style';
import { calculateColumnWidths } from './ExportExcellComponent/calculateColumnWidths';
import { convertColumnsToHeaders } from './ExportExcellComponent/convertColumnsToHeaders';
import { footerExcelTanstack } from './ExportExcellComponent/footerExcelTanstack';
import { mergeHeaderCells } from './ExportExcellComponent/mergeHeaderCells';
import { sortData } from './ExportExcellComponent/sortData';

/**
 * Xuất dữ liệu từ JSON sang tệp Excel với nhiều hàng tiêu đề
 * @param {Array} data - Dữ liệu JSON cần xuất.
 * @param {string} filename - Tên tệp Excel xuất ra.
 * @param {string} sheetName - Tên của worksheet trong tệp Excel.
 * @param {Array} columnsLeafvisible - các cột được lấy là cột lá đã sếp thứ tự
 * @param {Array} columnVisibility - các cột nào được hiển thị
 * @param {Array} columnWidths - chinh độ rộng cho các cột [max-width, min-width, space-width] đơn vị tính là chữ cái
 */
export function exportExcelTanstack(data, filename = "Myfile.xlsx", sheetName = "Sheet1", table, columnWidths = [80, 10, 3]) {
    const columnsLeafvisible = table.getAllLeafColumns()
    const columnVisibility = table.getState().columnVisibility
    const columnsLeafvisibleFilter = columnsLeafvisible.filter(item => columnVisibility[item.id] !== false);
    const sortedData = sortData(columnsLeafvisibleFilter, data);
    const headers = convertColumnsToHeaders(columnsLeafvisibleFilter);
    const footerData = [footerExcelTanstack(table)]
    const workbook = XLSX.utils.book_new();
    // Tạo worksheet với nhiều hàng tiêu đề
    const wsWithHeaders = XLSX.utils.aoa_to_sheet(headers);

    // Định dạng tiêu đề để bôi đậm, căn giữa và thay đổi màu nền
    const boldHeaderStyle = {
        font: { bold: true }, // Bôi đậm tiêu đề
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, // Căn giữa
        fill: { fgColor: { rgb: 'D2B48C' } } // Màu nền nâu (tan)
    };

    // Áp dụng định dạng cho tiêu đề
    headers.forEach((headerRow, rowIndex) => {
        headerRow.forEach((header, colIndex) => {
            const cellAddress = { c: colIndex, r: rowIndex };
            const cellRef = XLSX.utils.encode_cell(cellAddress);

            // Cập nhật kiểu của ô nếu chưa được định nghĩa
            if (!wsWithHeaders[cellRef]) {
                wsWithHeaders[cellRef] = {};
            }
            wsWithHeaders[cellRef].s = boldHeaderStyle;
        });
    });

    // Merge các ô tiêu đề có giá trị giống nhau
    mergeHeaderCells(wsWithHeaders, headers);

    // Thêm dữ liệu vào worksheet (bắt đầu từ dòng đầu tiên trống sau tiêu đề)
    XLSX.utils.sheet_add_json(wsWithHeaders, sortedData, { header: [], skipHeader: true, origin: -1 });

    // Định dạng cho hàng có kiểu "normal" (chữ màu đen)
    const dataStyleNormalRow = {
        font: { color: { rgb: '000000' }, bold: false }, // Màu chữ đen
        // alignment: { horizontal: 'left', vertical: 'center' } // Căn lề trái và căn giữa theo chiều dọc
    };

    // Định dạng cho hàng có kiểu "group" hoặc "expand" (chữ màu vàng)
    const dataStyleGroupExpand = {
        font: { color: { rgb: '000000' }, bold: true }, // Màu chữ vàng
    };

    // Áp dụng định dạng cho dữ liệu dựa trên typeofRow
    data.forEach((row, rowIndex) => {
        Object.keys(row).forEach((key, colIndex) => {
            const cellAddress = { c: colIndex, r: rowIndex + headers.length }; // Dòng bắt đầu sau tiêu đề
            const cellRef = XLSX.utils.encode_cell(cellAddress);

            // Chọn định dạng dựa trên typeofRow
            let cellStyle = dataStyleNormalRow; // Mặc định là kiểu normal
            if (row.typeofRow === "group" || row.typeofRow === "expand") {
                cellStyle = dataStyleGroupExpand;
            }

            // Cập nhật kiểu của ô nếu chưa được định nghĩa
            if (!wsWithHeaders[cellRef]) {
                wsWithHeaders[cellRef] = {};
            }
            wsWithHeaders[cellRef].s = cellStyle;
        });
    });


    // Thiết lập độ rộng cột với maxColWidth, minColWidth và spaceWidth nếu columnWidths được cung cấp
    if (Array.isArray(columnWidths) && columnWidths.length === 3) {
        const characterPixel = 6; // ước tính 1 ký tự = 6.0 px
        const maxColWidth = columnWidths[0]; // Độ rộng tối đa (pixel)
        const minColWidth = columnWidths[1]; // Độ rộng tối thiểu (pixel)
        const spaceWidth = columnWidths[2]; // Khoảng trống bổ sung (pixel)

        // Lấy các khóa của các cột từ tiêu đề (cột cuối cùng trong headers)
        const columnKeys = headers[headers.length - 1].map((_, index) => Object.keys(data[0])[index]);

        // Tính toán độ rộng cột
        const colWidths = calculateColumnWidths(data, columnKeys, spaceWidth);

        // Đảm bảo độ rộng không vượt quá maxColWidth và không nhỏ hơn minColWidth
        colWidths.forEach(colWidth => {
            colWidth.wpx = Math.max(minColWidth, Math.min(colWidth.wpx, maxColWidth)) * characterPixel;
        });
        wsWithHeaders['!cols'] = colWidths;
    }
    const footerStartRow = headers.length + sortedData.length;
    XLSX.utils.sheet_add_json(wsWithHeaders, footerData, { header: [], skipHeader: true, origin: footerStartRow });

    // Định dạng cho footer với bôi đậm, nền vàng và chữ đen
    const footerStyle = {
        font: { bold: true }, // Bôi đậm tiêu đề
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, // Căn giữa
        fill: { fgColor: { rgb: 'D2B48C' } } // Màu nền nâu (tan)
    };


    // Áp dụng định dạng cho footer
    footerData.forEach((row, rowIndex) => {
        Object.keys(row).forEach((key, colIndex) => {
            const cellAddress = { c: colIndex, r: rowIndex + footerStartRow };
            const cellRef = XLSX.utils.encode_cell(cellAddress);

            if (!wsWithHeaders[cellRef]) {
                wsWithHeaders[cellRef] = {};
            }
            wsWithHeaders[cellRef].s = footerStyle;
        });
    });

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, wsWithHeaders, sheetName);
    // Ghi workbook ra file
    XLSX.writeFile(workbook, filename);
}
