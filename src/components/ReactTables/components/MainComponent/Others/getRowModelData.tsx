export function getRowModelData<T>(table: Table<T>): T[] {
  const processedRowIds = new Set<string>();
    let selectedData: T[] = [];
    const rows =  table.getRowModel().rows
    rows.forEach(row => {
      let typeofRow = { typeofRow: 'nomal' }
      // Skip processing group rows
      if (row.getIsGrouped()) {
        typeofRow = { typeofRow: 'group' }
        const emptyOriginal = Object.keys(row.original).reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});
        const GroupRow = { ...emptyOriginal, ...row._valuesCache, ...row._groupingValuesCache, ...typeofRow };
        selectedData.push(GroupRow)
      } else {
        if (row.getCanExpand()) {
          typeofRow = { typeofRow: 'expand' }
          const ExpandRow = { ...row.original, ...typeofRow };
          selectedData.push(ExpandRow);
        } else {
          // Process only if the row is selected and hasn't been processed yet
          if ( !processedRowIds.has(row.id)) {
            const NomalRow = { ...row.original, ...typeofRow };
            selectedData.push(NomalRow);
            processedRowIds.add(row.id); // Mark the row as processed
          }
        }
      }
    });

    return selectedData;


  // // Start with the root rows
  // return extractSelectedRows(table.getRowModel().rows);
};