export function getSelectedData<T>(table: Table<T>): T[] {
  const { rowSelection } = table.getState();
  const processedRowIds = new Set<string>();

  function extractSelectedRows(rows: any[], selectedRowIds: Set<string>): T[] {
    let selectedData: T[] = [];

    rows.forEach(row => {
      const isSelected = selectedRowIds.has(row.id);
      let typeofRow = { _typeofRow: 'nomal' }
      // Skip processing group rows
      if (isSelected && row.getIsGrouped()) {
        typeofRow = { _typeofRow: 'group' }
        let GroupRow = {}
        const keysRows = Object.keys(row.original);
        keysRows.forEach((key) => {
          if(key !== 'subRows'){
            GroupRow[key] = row.getGroupingValue(key);
          }
        });
        Object.assign(GroupRow, typeofRow);
        selectedData.push(GroupRow)
      } else {
        if (isSelected && row.getCanExpand()) {
          typeofRow = { _typeofRow: 'expand' }
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