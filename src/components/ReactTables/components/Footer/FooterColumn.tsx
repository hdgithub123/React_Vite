// tính tổng trên từng cột
export const SumFooter = (column, table) => {
  return table.getFilteredRowModel().rows.reduce((sum, row) => {
    const cellValue = row.getValue(column.id);
    return typeof cellValue === 'number' ? sum + cellValue : sum;
  }, 0);
};

export const AverageFooter = (column, table) => {
    const { sum, count } = table.getFilteredRowModel().rows.reduce((acc, row) => {
      const cellValue = row.getValue(column.id);
      if (typeof cellValue === 'number') {
        acc.sum += cellValue;
        acc.count += 1;
      }
      return acc;
    }, { sum: 0, count: 0 });
  
    return count > 0 ? sum / count : 0;
  };
  

  export const CountFooter = (table) => {
    return table.getFilteredRowModel().rows.length;
  };