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
