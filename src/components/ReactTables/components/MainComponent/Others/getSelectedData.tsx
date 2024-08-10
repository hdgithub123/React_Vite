export function getSelectedData<T>(table: Table<T>): T[] {
  const { rowSelection } = table.getState();
  const processedRowIds = new Set<string>();

  function extractSelectedRows(rows: any[], selectedRowIds: Set<string>): T[] {
    let selectedData: T[] = [];

    rows.forEach(row => {
      const isSelected = selectedRowIds.has(row.id);
      // Skip processing group rows
      if (isSelected && row.getIsGrouped()) {
        const GroupRow = { ...row._valuesCache, ...row._groupingValuesCache };
        selectedData.push(GroupRow)
        // return;
      } else {
        // Process only if the row is selected and hasn't been processed yet
        if (isSelected && !processedRowIds.has(row.id)) {
          selectedData.push(row.original);
          processedRowIds.add(row.id); // Mark the row as processed
        }
        // Recursively extract selected subRows
        if (row.subRows && row.subRows.length > 0) {
          selectedData = selectedData.concat(extractSelectedRows(row.subRows, selectedRowIds, isSelected));
        }

      }
    });

    return selectedData;
  }

  // Convert the rowSelection keys to a Set for quick lookup
  const selectedRowIds = new Set(Object.keys(rowSelection));

  // Start with the root rows
  return extractSelectedRows(table.getRowModel().rows, selectedRowIds);
};