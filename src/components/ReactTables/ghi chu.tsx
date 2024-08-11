import { getGroupedRowModel } from "@tanstack/react-table"

header.column.columnDef.filterFn-- -> đường dẫn đến filterFn
header.column.setFilterValue-- -> đường dẫn đến setFilterValue
column.columnDef.filterT-- > lấy được giá trị của filterT: trên colums

// ve xuat excell 

để lấy dữ liệu ra khi bị getGroupedRowModel

với các ô group thì tại các dòng row là gruop thì 
nếu ô nào là gruop thì lấy giá trị theo groupingColumnId = row._valuesCache = {
  idcolumn: Value,
}

nếu các ô còn lại thuộc row._groupingValuesCache thì lấy theo giá trị này _groupingValuesCache ={
  idcolumn1: Value1,
  idcolumn2: Value2,
}

còn lại thì sẽ lấy giá trị null


---> chỉnh sửa hàm này ở phần 

if (row.getIsGrouped()) {
  return;
}


export function getSelectedData<T>(table: Table<T>): T[] {
  const { rowSelection } = table.getState();
  const processedRowIds = new Set<string>();

  function extractSelectedRows(rows: any[], selectedRowIds: Set<string>): T[] {
    let selectedData: T[] = [];

    rows.forEach(row => {
      const isSelected = selectedRowIds.has(row.id);
      // Skip processing group rows
      if (row.getIsGrouped()) {
        return;
      }

      // Process only if the row is selected and hasn't been processed yet
      if (isSelected && !processedRowIds.has(row.id)) {
        selectedData.push(row.original);
        processedRowIds.add(row.id); // Mark the row as processed
      }

      // Recursively extract selected subRows
      if (row.subRows && row.subRows.length > 0) {
        selectedData = selectedData.concat(extractSelectedRows(row.subRows, selectedRowIds, isSelected));
      }
    });

    return selectedData;
  }

  // Convert the rowSelection keys to a Set for quick lookup
  const selectedRowIds = new Set(Object.keys(rowSelection));

  // Start with the root rows
  return extractSelectedRows(table.getRowModel().rows, selectedRowIds);
};




columns.parent : nếu undefined thì không có parent
columns.parent.id : lấy ra id của parent
columns.parent.columnDef.header : tên của column cha