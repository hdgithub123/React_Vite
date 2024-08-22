/**
 * Chuyển đổi cấu trúc tiêu đề dạng cây thành mảng các hàng tiêu đề
 * @param {Array} columns - Cấu trúc tiêu đề dạng cây.
 * @returns {Array} - Mảng các hàng tiêu đề.
 */
export function convertColumnsToHeaders(columnsLeafVisible) {
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