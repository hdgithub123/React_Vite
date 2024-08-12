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
    const parentHeader = []

    const getParentObj = (array) => {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            if (array[i].parent === undefined) {
                result.push(array[i]);
            } else {
                result.push(array[i].parent);
            }
        }
        return result;
    };

    const getMaxDepth = (array) => {
        return Math.max(...array.map(obj => obj.depth));
    };
    const maxDepth = getMaxDepth(columnsLeafVisible)
    let parentObj = getParentObj(columnsLeafVisible);

    for (let i = 0; i < maxDepth; i++) {
        parentHeader.push(parentObj);
        parentObj = getParentObj(parentObj);

    }
    parentHeader.reverse();
    parentHeader.push(columnsLeafVisible);

    const headers = []
    parentHeader.forEach(parentItem => {
        let header = []
        parentItem.forEach(item => {
            if (typeof item.columnDef.header === 'string') {
                header.push(item.columnDef.header);
            } else {
                header.push(item.id);
            }
        });
        headers.push(header);
    });
    
    const rowCount = headers.length;
    const colCount = headers[0] ? headers[0].length : 0;

    for (let col = 0; col < colCount; col++) {
        let currentHeader = headers[0][col];
        for (let row = 0; row < rowCount -1 ; row++) { 
            let nextHeader = headers[row + 1][col];
    
            if (currentHeader === nextHeader) {
                headers[row + 1][col] = "";
            } else {
                currentHeader = headers[row + 1][col];
            }
        }
    }
    return headers;
}



function mergeHeaderCells(ws, headers) {
    const merges = [];
    const rowCount = headers.length;
    const colCount = headers[0] ? headers[0].length : 0;
    // Merge theo hàng
    for (let row = 0; row < rowCount; row++) {
        let startAddress = { c: 0, r: row }
        let endAddress = { c: 0, r: row }

        for (let col = 0; col < colCount; col++) {
            const currentHeader = headers[row][col];
            const NextHeader = headers[row][col + 1];


            if (currentHeader === NextHeader) {
                // Merge các ô có cùng giá trị trên cùng một hàng
                startAddress = { c: startAddress.c, r: startAddress.r };
            } else {
                endAddress = { c: col, r: row };
                if (JSON.stringify(startAddress) !== JSON.stringify(endAddress) && (currentHeader !== null && currentHeader !== "")) {
                    merges.push({ s: startAddress, e: endAddress });
                }

                startAddress = { c: col + 1, r: row };
            }
        }

    }
    // Định dạng merge cho các ô
    ws['!merges'] = merges;
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
    const workbook = XLSX.utils.book_new();

    // Tạo worksheet với nhiều hàng tiêu đề
    const wsWithHeaders = XLSX.utils.aoa_to_sheet(headers);


    // // Định dạng tiêu đề để bôi đậm
    // const boldHeaderStyle = {
    //     font: { bold: true }  // Bôi đậm tiêu đề
    // };

    // // Áp dụng định dạng cho tiêu đề
    // headers.forEach((headerRow, rowIndex) => {
    //     headerRow.forEach((header, colIndex) => {
    //         const cellAddress = { c: colIndex, r: rowIndex };
    //         const cellRef = XLSX.utils.encode_cell(cellAddress);

    //         // Cập nhật kiểu của ô nếu chưa được định nghĩa
    //         if (!wsWithHeaders[cellRef]) {
    //             wsWithHeaders[cellRef] = {};
    //         }
    //         wsWithHeaders[cellRef].s = boldHeaderStyle;
    //     });
    // });

    // Merge các ô tiêu đề có giá trị giống nhau
    mergeHeaderCells(wsWithHeaders, headers);

    // Thêm dữ liệu vào worksheet (bắt đầu từ dòng đầu tiên trống sau tiêu đề)
    XLSX.utils.sheet_add_json(wsWithHeaders, data, { header: [], skipHeader: true, origin: -1 });

    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, wsWithHeaders, sheetName);

    // Ghi workbook ra file
    XLSX.writeFile(workbook, filename);
}