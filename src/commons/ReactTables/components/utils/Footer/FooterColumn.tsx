import { formatNumber } from "../Others/fomatCell";

// tính tổng trên từng cột
export const SumFooter = (column, table , minFractionDigits = 0, maxFractionDigits = 20,option = {}, locale = null) => {
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
  return formatNumber(calculateSum(table.getFilteredRowModel ().rows),minFractionDigits,maxFractionDigits,option,locale);
};


export const AverageFooter = (column, table, minFractionDigits = 0, maxFractionDigits = 20,option = {}, locale = null) => {
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
  const { sum, count } = calculateSumAndCount(table.getFilteredRowModel().rows);

  return count > 0 ? formatNumber((sum / count),minFractionDigits,maxFractionDigits,option,locale) : 0;
};

  

export const CountFooter = (table, minFractionDigits = 0, maxFractionDigits = 20,option = {}, locale = null) => {
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
  return formatNumber(countRows(table.getFilteredRowModel().rows),minFractionDigits,maxFractionDigits,option,locale);
};

