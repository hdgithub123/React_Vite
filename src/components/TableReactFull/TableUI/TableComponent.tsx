// TableComponent.tsx
import React from 'react';
import { useReactTableWithHiddenRows, flexRender } from './useReactTableWithHiddenRows';

interface TableData {
  id: string;
  name: string;
  age: number;
}

const data: TableData[] = [
  { id: '1', name: 'Alice', age: 25 },
  { id: '2', name: 'Bob', age: 30 },
  { id: '3', name: 'Charlie', age: 35 },
];

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

const hiddenRowIds = ['2']; // Example of hidden row IDs

const TableComponent: React.FC = () => {
  const table = useReactTableWithHiddenRows({
    data,
    columns,
    hiddenRowIds, // Pass hiddenRowIds to the hook
  });

  const { getHeaderGroups, getRowModel } = table;

  return (
    <table>
      <thead>
        {getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
