export function getSelectedData<T>(table: Table<T>): T[] {
  const { rowSelection } = table.getState();
  const processedRowIds = new Set<string>();

  function extractSelectedRows(rows: any[], selectedRowIds: Set<string>): T[] {
    let selectedData: T[] = [];

    rows.forEach(row => {
      const isSelected = selectedRowIds.has(row.id);
      let typeofRow = { typeofRow: 'nomal' }
      // Skip processing group rows
      if (isSelected && row.getIsGrouped()) {
        typeofRow = { typeofRow: 'group' }
        const emptyOriginal = Object.keys(row.original).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});
        const GroupRow = { ...emptyOriginal, ...row._valuesCache, ...row._groupingValuesCache, ...typeofRow };
        selectedData.push(GroupRow)
        // return;
      } else {
        if (isSelected && row.getCanExpand()) {
          typeofRow = { typeofRow: 'expand' }
          const ExpandRow = { ...row.original, ...typeofRow };
          selectedData.push(ExpandRow);
        } else {
          // Process only if the row is selected and hasn't been processed yet
          if (isSelected && !processedRowIds.has(row.id)) {
            const NomalRow = { ...row.original, ...typeofRow };
            selectedData.push(NomalRow);
            processedRowIds.add(row.id); // Mark the row as processed
          }
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