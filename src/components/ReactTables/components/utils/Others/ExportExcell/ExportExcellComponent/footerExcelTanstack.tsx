export function footerExcelTanstack(data, table ) {
  let caculateItem
  const columnsLeafvisible = table.getAllLeafColumns()
  const columnVisibility = table.getState().columnVisibility
  const columnsLeafvisibleFilter = columnsLeafvisible.filter(item => columnVisibility[item.id] !== false);
  const functionSumFooterName = 'SumFooter'
  const functionAverageFooterName = 'AverageFooter'
  const functionCountFooterName = 'CountFooter'
  let footerObject ={}

  columnsLeafvisibleFilter.map(item => {
    let fuctionString = "";
    if (typeof item.columnDef.footer === 'function') {
      fuctionString = item.columnDef.footer.toString()
    }

    if (!fuctionString) {
      caculateItem = ""
    } else {
      if (fuctionString.includes(functionSumFooterName)) {
        caculateItem = "Sum: " + calculateSum(item, data).toString();
      } else if (fuctionString.includes(functionAverageFooterName)) {
        caculateItem = "Average: " + calculateAverage(item, data).toString();
      } else if (fuctionString.includes(functionCountFooterName)) {
        caculateItem = "Count: " + countRows(data).toString();
      } else {
        caculateItem = ""
      }
    }

    footerObject = { ...footerObject, [item.id]: caculateItem };
  });
  return footerObject
}


const calculateSum = (column, rows) => {
  return rows.reduce((sum, row) => {
    if (row.typeofRow !== 'group'){
      const cellValue = row[column.id];
      // If the cell value is a number, add it to the sum
      let rowSum = typeof cellValue === 'number' ? cellValue : 0;
  
      // Recursively sum the sub-rows if they exist
      if (row.subRows && row.subRows.length > 0) {
        rowSum += calculateSum(column,row.subRows);
      }
  
      return sum + rowSum;
    } else {
      return sum;
    } 

  }, 0);
};


const calculateAverage = (column, rows) => {
  const calculateSumAndCount = (column, rows) => {
    return rows.reduce(
      (acc, row) => {
        if (row.typeofRow !== 'group'){
          const cellValue = row[column.id];
          if (typeof cellValue === 'number') {
            acc.sum += cellValue;
            acc.count += 1;
          }
        } 
        
        // Recursively process sub-rows if they exist
        if (row.subRows && row.subRows.length > 0) {
          const subRowResult = calculateSumAndCount(column,row.subRows);
          acc.sum += subRowResult.sum;
          acc.count += subRowResult.count;
        }
  
        return acc;
      },
      { sum: 0, count: 0 }
    );
  };

    // Start calculation from the filtered row model
    const { sum, count } = calculateSumAndCount(column, rows);
    return count > 0 ? sum / count : 0;
}





const countRows = (rows) => {
  return rows.reduce((acc, row) => {
    if (row.typeofRow !== 'group') {
      acc += 1; // Count the current row
      // Recursively count sub-rows if they exist
      if (row.subRows && row.subRows.length > 0) {
        acc += countRows(row.subRows);
      }
    }
    return acc; // Return the accumulator
  }, 0);
};
