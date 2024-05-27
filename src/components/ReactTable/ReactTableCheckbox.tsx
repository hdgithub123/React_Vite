import React, { useState } from 'react';
import { useTable, useBlockLayout, useResizeColumns, useRowSelect } from 'react-table';
import './ReactTable.css'; // Import CSS file

const ReactTableCheckbox = ({ columns, data, defaultColumn, onRowSelect }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows, // Sử dụng để lấy các dòng đã chọn
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useRowSelect, // Sử dụng hook useRowSelect
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Thêm một cột chọn dòng vào header
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleRowClick = (rowIndex, rowData) => {
    if (onRowSelect) {
      onRowSelect(rowData);
    }
    setSelectedIndex(rowIndex);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, rows.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex !== -1) {
        const selectedRow = rows[selectedIndex];
        onRowSelect(selectedRow.original);
      }
    }
  };

  return (
    <div className="react-table-container">
      <table {...getTableProps()} className="react-table" onKeyDown={handleKeyDown} tabIndex="0">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div
                    {...column.getResizerProps()}
                    className={`react-table-resizer ${column.isResizing ? "react-table-isResizing" : ""
                      }`}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`react-table-row ${rowIndex === selectedIndex ? 'highlighted' : ''}`}
                onClick={() => handleRowClick(rowIndex, row.original)}
              >
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="react-table-cell">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReactTableCheckbox;
