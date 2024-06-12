// tính tổng trên từng cột
export const calculateColumnSum = (column, table) => {
  return table.getFilteredRowModel().rows.reduce((sum, row) => {
    const cellValue = row.getValue(column.id);
    return typeof cellValue === 'number' ? sum + cellValue : sum;
  }, 0);
};

  