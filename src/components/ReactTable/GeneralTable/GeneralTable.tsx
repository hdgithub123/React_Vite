import React from 'react';
import { useTable, useFilters, useGlobalFilter, useSortBy, useRowSelect, usePagination, useColumnOrder, useFlexLayout, useBlockLayout, useGroupBy, useResizeColumns, useExpanded } from 'react-table';
import './GeneralTable.css'
const GeneralTable = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows,
        visibleColumns,
        allColumns,
        getToggleHideAllColumnsProps,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex, pageSize },
        gotoPage,
        setPageSize,
        setGroupBy,
        toggleGroupBy,
        setColumnOrder, // Đảm bảo useColumnOrder đặt trước useGroupBy
        resetGroupBy,
        setColumnWidth,
        setHiddenColumns,
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter,
  useColumnOrder, // Đảm bảo useColumnOrder đặt trước useGroupBy
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useFlexLayout,
        useBlockLayout,
        useResizeColumns,
       
      );
      

  return (
    <>
      {/* Global Filter */}
      <input
        value={state.globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search..."
      />

      {/* Table */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.canGroupBy ? (
                    // If the column can be grouped, let's add a toggle
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? '🛑 ' : '👊 '}
                    </span>
                  ) : null}
                  {column.render('Header')}
                  {/* Sort Icon */}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                  {/* Filter Input */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      // For educational purposes, let's color the
                      // cell depending on what type it is given
                      // from the useGroupBy hook
                      {...cell.getCellProps()}
                    //   style={{
                    //     background: cell.isGrouped
                    //       ? '#0aff0082'
                    //       : cell.isAggregated
                    //       ? '#ffa50078'
                    //       : cell.isPlaceholder
                    //       ? '#ff000042'
                    //       : 'white',
                    //   }}  // gây ra lỗi không thẳng hàng
                    >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          {/* {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })} */}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default GeneralTable;
