
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


export const AverageFooter = (column, table) => {
  // Recursive function to calculate sum and count for all rows, including sub-rows
  const calculateSumAndCount = (rows) => {
    return rows.reduce(
      (acc, row) => {
        const cellValue = row.getValue(column.id);
        if (typeof cellValue === 'number') {
          acc.sum += cellValue;
          acc.count += 1;
        }

        // Recursively process sub-rows if they exist
        if (row.subRows && row.subRows.length > 0) {
          const subRowResult = calculateSumAndCount(row.subRows);
          acc.sum += subRowResult.sum;
          acc.count += subRowResult.count;
        }

        return acc;
      },
      { sum: 0, count: 0 }
    );
  };

  // Start calculation from the filtered row model
  const { sum, count } = calculateSumAndCount(table.getRowModel().rows);

  return count > 0 ? sum / count : 0;
};

  

export const CountFooter = (table) => {
  // Recursive function to count all rows, including sub-rows
  const countRows = (rows) => {
    return rows.reduce((acc, row) => {
      let totalCount = acc + 1; // Count the current row

      // Recursively count sub-rows if they exist
      if (row.subRows && row.subRows.length > 0) {
        totalCount += countRows(row.subRows);
      }

      return totalCount;
    }, 0);
  };

  // Start counting from the filtered row model
  return countRows(table.getRowModel().rows);
};

