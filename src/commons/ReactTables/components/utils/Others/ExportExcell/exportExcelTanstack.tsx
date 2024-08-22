import * as XLSX from 'xlsx-js-style';
import { calculateColumnWidths } from './ExportExcellComponent/calculateColumnWidths';
import { convertColumnsToHeaders } from './ExportExcellComponent/convertColumnsToHeaders';
import { footerExcelTanstack } from './ExportExcellComponent/footerExcelTanstack';
import { mergeHeaderCells } from './ExportExcellComponent/mergeHeaderCells';
import { sortData } from './ExportExcellComponent/sortData';

/**
 * Xuất dữ liệu từ JSON sang tệp Excel với nhiều hàng tiêu đề
 * @param {Array} data - Dữ liệu JSON cần xuất.
 * @param {object} exportFile - Tên tệp Excel xuất ra.
 * @param {Array} columnsLeafvisible - các cột được lấy là cột lá đã sếp thứ tự
 * @param {Array} columnVisibility - các cột nào được hiển thị
 * @param {Array} columnWidths - chinh độ rộng cho các cột [max-width, min-width, space-width] đơn vị tính là chữ cái
 */

export function exportExcelTanstack(data, table, exportFile = { name: "Myfile.xlsx", sheetName: "Sheet1", title: null, description: null }, columnWidths = [80, 10, 3]) {
    const columnsLeafvisible = table.getAllLeafColumns();
    const columnVisibility = table.getState().columnVisibility;
    const columnsLeafvisibleFilter = columnsLeafvisible.filter(item => columnVisibility[item.id] !== false);
    const sortedData = sortData(columnsLeafvisibleFilter, data);
    const headers = convertColumnsToHeaders(columnsLeafvisibleFilter);
    const footerData = [footerExcelTanstack(data, table)];
    const workbook = XLSX.utils.book_new();
    let haveTitle = false
    let worksheetData =[]
    if (exportFile.title && exportFile.title.trim()){
        const titleData = [[exportFile.title]];
        const descriptionData = [[exportFile.description]];
        worksheetData = [
            ...titleData,        // Thêm tiêu đề
            ...descriptionData,  // Thêm mô tả
            ...headers           // Thêm các tiêu đề cột
        ];
        haveTitle = true;
    } else {
        worksheetData = [
            ...headers           // Thêm các tiêu đề cột
        ];
        haveTitle = false;
    }

    // Tạo dữ liệu cho tiêu đề và mô tả
    
    let RowIndex = 0
    const startRow = RowIndex
    // Kết hợp dữ liệu tiêu đề, mô tả, và các tiêu đề cột vào một mảng
    
    // Tạo worksheet từ dữ liệu kết hợp
    const wsWithHeaders = XLSX.utils.aoa_to_sheet(worksheetData, { origin: [RowIndex][0] });
    let titlemerges = []
    if (haveTitle) {
        // Định dạng tiêu đề và mô tả
        const titleStyle = {
            font: { bold: true, sz: 14 }, // Bôi đậm và kích thước lớn
            alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa
        };

        const descriptionStyle = {
            font: { bold: true, italic: true }, // Chữ nghiêng và kích thước nhỏ hơn
            alignment: { horizontal: 'center', vertical: 'center' }, // Căn giữa
        };


        // Merge các ô của dòng tiêu đề và mô tả nếu cần
        const totalColumns = columnsLeafvisibleFilter.length;
       
        if (totalColumns > 1) {
            titlemerges = [
                { s: { r: startRow, c: 0 }, e: { r: startRow, c: totalColumns - 1 } }, // Merge dòng tiêu đề
                { s: { r: startRow + 1, c: 0 }, e: { r: startRow + 1, c: totalColumns - 1 } }  // Merge dòng mô tả
            ];
        }

        // Áp dụng style cho dòng tiêu đề
        if (exportFile.title) {
            const titleCell = XLSX.utils.encode_cell({ r: startRow, c: 0 });
            wsWithHeaders[titleCell].s = titleStyle;
        }

        // Áp dụng style cho dòng mô tả
        if (exportFile.description) {
            const descriptionCell = XLSX.utils.encode_cell({ r: startRow + 1, c: 0 });
            wsWithHeaders[descriptionCell].s = descriptionStyle;
        }

        RowIndex = RowIndex + 2
    } else{

    }

   
    // Định dạng tiêu đề để bôi đậm, căn giữa và thay đổi màu nền
    const boldHeaderStyle = {
        font: { bold: true }, // Bôi đậm tiêu đề
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true }, // Căn giữa và ngắt dòng
        fill: { fgColor: { rgb: 'D2B48C' } }, // Màu nền nâu (tan)
    };

    // Áp dụng định dạng cho tiêu đề
    headers.forEach((headerRow, rowIndex) => {
        headerRow.forEach((header, colIndex) => {
            const cellAddress = { c: colIndex, r: (rowIndex + RowIndex) };
            const cellRef = XLSX.utils.encode_cell(cellAddress);

            // Cập nhật kiểu của ô nếu chưa được định nghĩa
            if (!wsWithHeaders[cellRef]) {
                wsWithHeaders[cellRef] = {};
            }
            wsWithHeaders[cellRef].s = boldHeaderStyle;
        });
    });

   
    const headerStartRow = RowIndex
    // Merge các ô 
    wsWithHeaders['!merges'] = [...titlemerges, ...mergeHeaderCells(headers, headerStartRow)];

    RowIndex = headers.length + RowIndex;
    const sortedDataStartRow = RowIndex;
    // Thêm dữ liệu vào worksheet (bắt đầu từ dòng đầu tiên trống sau tiêu đề)
    XLSX.utils.sheet_add_json(wsWithHeaders, sortedData, { header: [], skipHeader: true, origin: sortedDataStartRow });

    // Định dạng cho hàng có kiểu "normal" (chữ màu đen)
    const dataStyleNormalRow = {
        font: { color: { rgb: '000000' }, bold: false },
    };

    // Định dạng cho hàng có kiểu "group" hoặc "expand"
    const dataStyleGroupExpand = {
        font: { color: { rgb: '000000' }, bold: true },
    };
    // Áp dụng định dạng cho dữ liệu dựa trên typeofRow
    data.forEach((row, rowIndex) => {
        Object.keys(row).forEach((key, colIndex) => {
            const cellAddress = { c: colIndex, r: (rowIndex + RowIndex) };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            // Chọn định dạng dựa trên typeofRow
            let cellStyle = dataStyleNormalRow; // Mặc định là kiểu normal
            if (row._typeofRow === "group" || row._typeofRow === "expand") {
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
        const columnKeys = headers[headers.length - 1].map((_, index) => Object.keys(sortedData[0])[index]);

        // Tính toán độ rộng cột
        const colWidths = calculateColumnWidths(sortedData, columnKeys, spaceWidth);

        // Đảm bảo độ rộng không vượt quá maxColWidth và không nhỏ hơn minColWidth
        colWidths.forEach(colWidth => {
            colWidth.wpx = Math.max(minColWidth, Math.min(colWidth.wpx, maxColWidth)) * characterPixel;
        });
        wsWithHeaders['!cols'] = colWidths;
    }

    // Thêm dữ liệu footer vào worksheet
    RowIndex = RowIndex + sortedData.length
    const footerStartRow = RowIndex;


    XLSX.utils.sheet_add_json(wsWithHeaders, footerData, { header: [], skipHeader: true, origin: footerStartRow });

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
    XLSX.utils.book_append_sheet(workbook, wsWithHeaders, exportFile.sheetName);

    // Ghi workbook ra file
    XLSX.writeFile(workbook, exportFile.name);
}









