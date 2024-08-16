import {
    flexRender,
} from '@tanstack/react-table';







export function SumFooterExcell( table) {
    const header = table.getHeaderGroups()[2].headers[2]
    console.log("header", header)
    const flex = flexRender(header.column.columnDef.footer,header.getContext())
    console.log("flexRender",flex)
    console.log("flexRender",flex)
    return flexRender(
        header.column.columnDef.footer,
        header.getContext(),
    )

    
}



// tính tổng trên từng cột
export const SumFooter = (column, table) => {
    // Recursive function to sum all rows, including sub-rows
    const calculateSum = (rows) => {
      return rows.reduce((sum, row) => {
        const cellValue = row.getValue(column.id);
        // If the cell value is a number, add it to the sum
        let rowSum = typeof cellValue === 'number' ? cellValue : 0;
  
        // Recursively sum the sub-rows if they exist
        if (row.subRows && row.subRows.length > 0) {
          rowSum += calculateSum(row.subRows);
        }
  
        return sum + rowSum;
      }, 0);
    };
  
    // Start the calculation with the filtered row model
    return calculateSum(table.getRowModel().rows);
  };