export function calculateColumnWidths(data, columnKeys, spaceWidth) {
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