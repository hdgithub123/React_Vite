import React from 'react'

import './GroupTable.css'

import {
  GroupingState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getCoreRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'

export type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: 'relationship' | 'complicated' | 'single'
    subRows?: Person[]
  }

const makeData = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      age: 28,
      visits: 120,
      progress: 75,
      status: 'relationship',
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      age: 35,
      visits: 80,
      progress: 60,
      status: 'single',
    },
    {
      firstName: 'Charlie',
      lastName: 'Brown',
      age: 42,
      visits: 50,
      progress: 90,
      status: 'complicated',
    },
    {
      firstName: 'David',
      lastName: 'Lee',
      age: 22,
      visits: 200,
      progress: 40,
      status: 'relationship',
    },
    {
      firstName: 'Eva',
      lastName: 'Garcia',
      age: 30,
      visits: 150,
      progress: 70,
      status: 'single',
    },
    {
      firstName: 'Frank',
      lastName: 'Wang',
      age: 50,
      visits: 30,
      progress: 85,
      status: 'relationship',
    },
    {
      firstName: 'Grace',
      lastName: 'Miller',
      age: 25,
      visits: 100,
      progress: 55,
      status: 'single',
    },
    {
      firstName: 'Henry',
      lastName: 'Clark',
      age: 38,
      visits: 70,
      progress: 78,
      status: 'complicated',
    },
    {
      firstName: 'Isabella',
      lastName: 'Martinez',
      age: 27,
      visits: 180,
      progress: 65,
      status: 'relationship',
    },
    {
      firstName: 'Jack',
      lastName: 'Taylor',
      age: 33,
      visits: 90,
      progress: 50,
      status: 'single',
    },
  ];



function GroupTable() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        columns: [
          {
            accessorKey: 'firstName',
            header: 'First Name',
            filterT : <FirstNameFilter column={'firstName'}></FirstNameFilter>,
            cell: info => info.getValue(),
            /**
             * override the value used for row grouping
             * (otherwise, defaults to the value derived from accessorKey / accessorFn)
             */
            getGroupingValue: row => `${row.firstName} ${row.lastName}`,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            filterT : 'abcd',
            header: () => <span>Last Name</span>,
            cell: info => info.getValue(),
          },
        ],
      },
      {
        header: 'Info',
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            filterT : 'abcd',
            aggregatedCell: ({ getValue }) =>
              Math.round(getValue<number>() * 100) / 100,
            aggregationFn: 'median',
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                filterT : <h1> hello visit</h1>,
                header: () => <span>Visits</span>,
                aggregationFn: 'sum',
                // aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
              },
              {
                accessorKey: 'status',
                filterT : 'abcd',
                header: 'Status',
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                filterT : 'abcd',
                cell: ({ getValue }) =>
                  Math.round(getValue<number>() * 100) / 100 + '%',
                aggregationFn: 'mean',
                aggregatedCell: ({ getValue }) =>
                  Math.round(getValue<number>() * 100) / 100 + '%',
              },
            ],
          },
        ],
      },
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData)
  const refreshData = () => {
    console.log("grouping",grouping)
    setGrouping(["age","visits"]);


  }

  const [grouping, setGrouping] = React.useState<GroupingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      grouping,
    },
    onGroupingChange: setGrouping,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {header.column.getCanGroup() ? (
                          // If the header can be grouped, let's add a toggle
                          <button
                            {...{
                              onClick: header.column.getToggleGroupingHandler(),
                              style: {
                                cursor: 'pointer',
                              },
                            }}
                          >
                            {header.column.getIsGrouped()
                              ? `🛑(${header.column.getGroupedIndex()}) `
                              : `👊 `}
                          </button>
                        ) : null}{' '}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {flexRender(
                          header.column.columnDef.filterT,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      {...{
                        key: cell.id,
                        style: {
                          background: cell.getIsGrouped()
                            ? '#0aff0082'
                            : cell.getIsAggregated()
                              ? '#ffa50078'
                              : cell.getIsPlaceholder()
                                ? '#ff000042'
                                : 'white',
                        },
                      }}
                    >
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? 'pointer'
                                  : 'normal',
                              },
                            }}
                          >
                            {row.getIsExpanded() ? '👇' : '👉'}{' '}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}{' '}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(grouping, null, 2)}</pre>
    </div>
  )
}

export default GroupTable;


function FirstNameFilter({ column }) {
  const { setFilter, filterValue } = column

  // Định nghĩa hàm filterFn
  const filterFn = (row, filterValue) => {
    const firstName = row.original.firstName.toLowerCase()
    const filterText = filterValue.toLowerCase()
    return firstName.includes(filterText)
  }

  return (
    <input
      type="text"
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value, filterFn)}
      placeholder="Search..."
    />
  )
}