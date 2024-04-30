import React, { useState } from 'react';
import { useTable, useBlockLayout, useResizeColumns } from "react-table";
import './ReactTable.css'; // Import CSS file

const ReactTable = ({ columns, data, onRowSelect }) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 200
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    resetResizing
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout,
    useResizeColumns
  );
  const [selectedIndex, setSelectedIndex] = useState(-1); // State để lưu trữ chỉ số của dòng được chọn

  const handleRowClick = (rowIndex, rowData) => {
    if (onRowSelect) {
      onRowSelect(rowData);
    }
    setSelectedIndex(rowIndex); // Cập nhật chỉ số của dòng được chọn
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Di chuyển lên một dòng
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, rows.length - 1)); // Di chuyển xuống một dòng
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex !== -1) {
        const selectedRow = rows[selectedIndex];
        onRowSelect(selectedRow.original); // Chọn dòng
      }
    }
  };

  return (
    <table {...getTableProps()} className="react-table" onKeyDown={handleKeyDown} tabIndex="0">
      <thead>
        {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map((column) => (
             <th {...column.getHeaderProps()}>
               {column.render("Header")}
               <div
                 {...column.getResizerProps()}
                 className={`resizer ${
                   column.isResizing ? "isResizing" : ""
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
              className={`react-table-row ${rowIndex === selectedIndex ? 'highlighted' : ''}`} // Sử dụng className để highlight dòng được chọn
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
  );
};

export default ReactTable;
