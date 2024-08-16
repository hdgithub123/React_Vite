import * as XLSX from 'xlsx-js-style';

/**
 * Xuất dữ liệu từ JSON sang tệp Excel với nhiều hàng tiêu đề
 * @param {Array} data - Dữ liệu JSON cần xuất.
 * @param {string} filename - Tên tệp Excel xuất ra.
 * @param {string} sheetName - Tên của worksheet trong tệp Excel.
 * @param {Array} columnsLeafvisible - các cột được lấy là cột lá đã sếp thứ tự
 * @param {Array} columnVisibility - các cột nào được hiển thị
 * @param {Array} columnWidths - chinh độ rộng cho các cột [max-width, min-width, space-width] đơn vị tính là chữ cái
 */
export function exportExcelTanstack(data, filename, sheetName, columnsLeafvisible, columnVisibility, columnWidths) {
    const columnsLeafvisibleFilter = columnsLeafvisible.filter(item => columnVisibility[item.id] !== false);
    const sortedData = sortData(columnsLeafvisibleFilter, data);
    const headers = convertColumnsToHeaders(columnsLeafvisibleFilter);
    const workbook = XLSX.utils.book_new();

    console.log("columnsLeafvisible",columnsLeafvisible)
    // Tạo worksheet với nhiều hàng tiêu đề
    const wsWithHeaders = XLSX.utils.aoa_to_sheet(headers);

    // Định dạng tiêu đề để bôi đậm, căn giữa và thay đổi màu nền
    const boldHeaderStyle = {
        font: { bold: true }, // Bôi đậm tiêu đề
        alignment: { horizontal: 'center', vertical: 'center',wrapText: true }, // Căn giữa
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
    // Thêm worksheet vào workbook
    XLSX.utils.book_append_sheet(workbook, wsWithHeaders, sheetName);
    // Ghi workbook ra file
    XLSX.writeFile(workbook, filename);
}

function sortData(arraySort, data) {
    // Lấy thứ tự id từ arraySort
    const order = arraySort.map(item => item.id);

    // Sắp xếp dataB theo thứ tự id của arraySort
    return data.map(item => {
        const sortedItem = {};
        order.forEach(id => {
            if (item.hasOwnProperty(id)) {
                sortedItem[id] = item[id];
            }
        });
        return sortedItem;
    });
}


/**
 * Chuyển đổi cấu trúc tiêu đề dạng cây thành mảng các hàng tiêu đề
 * @param {Array} columns - Cấu trúc tiêu đề dạng cây.
 * @returns {Array} - Mảng các hàng tiêu đề.
 */
function convertColumnsToHeaders(columnsLeafVisible) {
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
        for (let row = 0; row < rowCount - 1; row++) {
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


function calculateColumnWidths(data, columnKeys, spaceWidth) {
    // Mảng lưu độ rộng cột tính toán cho từng cột
    const colWidths = [];

    // Duyệt qua các key của các cột
    columnKeys.forEach((key, index) => {
        // Tính toán độ rộng tối ưu cho cột hiện tại
        const maxLength = Math.max(
            ...data.map(row => row[key] ? row[key].toString().length : 0)
        );

        // Tính toán độ rộng của cột với khoảng trống bổ sung
        const dataWidth = maxLength + spaceWidth;

        // Đưa vào mảng với đơn vị là pixel, nhân với 10 để phù hợp với định dạng của XLSX
        colWidths.push({ wpx: dataWidth });
    });

    return colWidths;
}