export function mergeHeaderCells(ws, headers) {
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