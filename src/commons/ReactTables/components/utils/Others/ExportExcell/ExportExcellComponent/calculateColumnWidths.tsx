
// nâng cấp để tính nhiều dòng trong 1 file cứ 100,000 dòng sẽ tính 1 lần

export function calculateColumnWidths(data, columnKeys, spaceWidth ) {
    const chunkSize = 100000
    // Mảng lưu độ rộng cột tính toán cho từng cột
    const colWidths = Array(columnKeys.length).fill(0);

    // Tính toán trong các chunk để tránh xử lý quá nhiều dòng một lúc
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);

        // Duyệt qua các key của các cột
        columnKeys.forEach((key, index) => {
            if (key !== '_typeofRow') {
                // Tìm độ dài lớn nhất trong chunk hiện tại cho cột này
                const maxLength = Math.max(
                    ...chunk.map(row => row[key] ? row[key].toString().length : 0)
                );

                // Cập nhật độ rộng cột nếu maxLength trong chunk này lớn hơn
                colWidths[index] = Math.max(colWidths[index], maxLength + spaceWidth);
            }
        });
    }

    // Chuyển đổi độ rộng từ ký tự sang pixel (wpx)
    return colWidths.map(width => ({ wpx: width }));
}
