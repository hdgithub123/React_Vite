export function mergeHeaderCells(headers, startRowIndex = 0) {
    const merges = [];
    const rowCount = headers.length;
    const colCount = headers[0] ? headers[0].length : 0;

    // Merge cells by row
    for (let row = 0; row < rowCount; row++) {
        let startAddress = { c: 0, r: row + startRowIndex };
        let endAddress = { c: 0, r: row + startRowIndex };

        for (let col = 0; col < colCount; col++) {
            const currentHeader = headers[row][col];
            const nextHeader = headers[row][col + 1];

            if (currentHeader === nextHeader) {
                // Continue merging cells with the same value in the same row
                startAddress = { c: startAddress.c, r: startAddress.r };
            } else {
                endAddress = { c: col, r: row + startRowIndex };
                if (
                    JSON.stringify(startAddress) !== JSON.stringify(endAddress) &&
                    currentHeader !== null &&
                    currentHeader !== ""
                ) {
                    merges.push({ s: startAddress, e: endAddress });
                }

                startAddress = { c: col + 1, r: row + startRowIndex };
            }
        }
    }

    // Return the merge range
    return merges;
}



