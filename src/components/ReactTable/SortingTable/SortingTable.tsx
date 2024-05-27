import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import './SortingTable.css'

const MOCK_DATA = [{ "id": 1, "first_name": "Torie", "last_name": "Rustman", "email": "trustman0@amazon.co.uk", "date_of_birth": "1979-11-16T23:04:32Z", "age": 45, "country": "Argentina", "phone": "6844103517" },
{ "id": 2, "first_name": "Kordula", "last_name": "Gecks", "email": "kgecks1@deviantart.com", "date_of_birth": "1997-08-06T21:07:34Z", "age": 30, "country": "Greece", "phone": "8429683893" },
{ "id": 3, "first_name": "Vikki", "last_name": "Simoens", "email": "vsimoens2@ted.com", "date_of_birth": "2016-04-28T16:59:19Z", "age": 48, "country": "Czech Republic", "phone": "8672773997" },
{ "id": 4, "first_name": "Burnaby", "last_name": "Cowern", "email": "bcowern3@forbes.com", "date_of_birth": "2017-10-25T08:05:50Z", "age": 54, "country": "Equatorial Guinea", "phone": "4257971694" },
{ "id": 5, "first_name": "Teddie", "last_name": "Traice", "email": "ttraice4@zdnet.com", "date_of_birth": "2015-04-20T11:45:34Z", "age": 57, "country": "Russia", "phone": "3932158370" },
{ "id": 6, "first_name": "Sapphira", "last_name": "Hutchinges", "email": "shutchinges5@cam.ac.uk", "date_of_birth": "1995-06-15T22:08:17Z", "age": 53, "country": "Ethiopia", "phone": "5094928131" },
{ "id": 7, "first_name": "Shayna", "last_name": "Dimitresco", "email": "sdimitresco6@uiuc.edu", "date_of_birth": "1997-10-28T11:25:07Z", "age": 21, "country": "Indonesia", "phone": "1216713219" },
{ "id": 8, "first_name": "Caron", "last_name": "Tomkinson", "email": "ctomkinson7@nature.com", "date_of_birth": "1989-03-14T19:48:26Z", "age": 47, "country": "Ukraine", "phone": "6895680771" },
{ "id": 9, "first_name": "Hulda", "last_name": "Ceresa", "email": "hceresa8@omniture.com", "date_of_birth": "2016-04-26T18:07:18Z", "age": 24, "country": "United Arab Emirates", "phone": "2117090201" },
{ "id": 10, "first_name": "Neile", "last_name": "Clements", "email": "nclements9@irs.gov", "date_of_birth": "2001-05-22T23:12:25Z", "age": 39, "country": "Ukraine", "phone": "5863355971" },]

const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        disableFilters: true,
        sticky: 'left'
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        sticky: 'left'
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        sticky: 'left'
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Age',
        Footer: 'Age',
        accessor: 'age'
    },
]




export const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => MOCK_DATA, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          {footerGroups.map(footerGroup => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  )
}

export default SortingTable;