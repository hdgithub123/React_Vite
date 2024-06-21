// hiddenRows.ts
import { RowModel } from '@tanstack/table-core';

export interface HiddenRowOptions {
  hiddenRowIds: string[];
}

export const filterHiddenRows = <TData>(
  rowModel: RowModel<TData>,
  hiddenRowIds: string[]
): RowModel<TData> => {
  const rowsById = Object.fromEntries(
    Object.entries(rowModel.rowsById).filter(
      ([rowId]) => !hiddenRowIds.includes(rowId)
    )
  );
  const rows = Object.values(rowsById);

  return {
    ...rowModel,
    rowsById,
    rows,
  };
};
