header.column.columnDef.filterFn  ---> đường dẫn đến filterFn
header.column.setFilterValue ---> đường dẫn đến setFilterValue
column.columnDef.filterT --> lấy được giá trị của filterT: trên colums


// tính tổng trên từng cột
const calculateColumnSum = ( column, table) => {
    return table.getFilteredRowModel().rows.reduce((sum, row) => {
      const cellValue = row.getValue(column.id);
      return typeof cellValue === 'number' ? sum + cellValue : sum;
    }, 0);
  };
  
  
  footer: (info) => calculateColumnSum(info.column, info.table),