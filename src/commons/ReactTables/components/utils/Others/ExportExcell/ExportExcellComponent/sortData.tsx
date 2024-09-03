export function sortData(arraySort, data) {
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