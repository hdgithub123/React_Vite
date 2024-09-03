export function getRowModelData<T>(table: Table<T>): T[] {
  const processedRowIds = new Set<string>();
  let selectedData: T[] = [];
  const rows = table.getRowModel().rows
  rows.forEach(row => {
    let typeofRow = { _typeofRow: 'nomal' }
    // Skip processing group rows
    if (row.getIsGrouped()) {
      typeofRow = { _typeofRow: 'group' }
      let GroupRow = {}
      const keysRows = Object.keys(row.original);
      keysRows.forEach((key) => {
        if (key !== 'subRows') {
          GroupRow[key] = row.getGroupingValue(key);
        }
      });
      Object.assign(GroupRow, typeofRow);
      selectedData.push(GroupRow)
    } else {
      if (row.getCanExpand()) {
        typeofRow = { _typeofRow: 'expand' }
        const ExpandRow = { ...row.original, ...typeofRow };
        selectedData.push(ExpandRow);
      } else {
        // Process only if the row is selected and hasn't been processed yet
        if (!processedRowIds.has(row.id)) {
          const NomalRow = { ...row.original, ...typeofRow };
          selectedData.push(NomalRow);
          processedRowIds.add(row.id); // Mark the row as processed
        }
      }
    }
  });

  return selectedData;
};