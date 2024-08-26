export function getOneRowData(row) {
    let selectRow = {}
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
      selectRow = {...GroupRow, ...typeofRow}; 
    } else {
      if (row.getCanExpand()) {
        typeofRow = { _typeofRow: 'expand' }
        const ExpandRow = { ...row.original, ...typeofRow };
        selectRow = ExpandRow
      } else {
        selectRow = { ...row.original, ...typeofRow }
      }
    }

    return selectRow
}