1. các thư viện cài trong dự án ReactTables này:
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/modifiers": "^7.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@tanstack/react-table": "^8.20.1",
    "@tanstack/react-virtual": "^3.8.1",
    "xlsx-js-style": "^1.2.0" // thay thế cho thư viện xlsx để fomat cell trong Excell
  },


  2. cách sử dụng
  Các components
    ReactTableBasic,
    ReactTableBasicArrowkey,
    ReactTableFull,
    ReactTableFullArrowkey,
    ReactTableNomalArrowkey,
    ReactTablePages,
    SearchDropDown,

Input:
{ 
data,
columns, 
onDataChange, 
onRowSelect, 
onRowsSelect, 
onVisibleColumnDataSelect, 
grouped = [], 
exportFile = { name: "Myfile.xlsx", sheetName: "Sheet1", title: null, description: null }, 
isGlobalFilter = false 
} 

1.0 data: Dữ liệu được đưa vào có dạng
1.1[{key: value,...},...]
ví dụ:  [{ firstName: '1Alice', lastName: 'Smith', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
        { firstName: '2Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
        ]
1.2
ví dụ: đối với dữ liệu có phân bậc

[
    { firstName: "0Jane", lastName: "Doe", age: 30, visits: "2025-0111-01", progress: 50, status: 'relationship',
    subRows: [
                {firstName: "0.1Jane",lastName: "Smith",age: 25,visits: "2025-01-01",progress: 80,status: 'single',
                subRows: [
                      {firstName: "0.0.1Jane",lastName: "Smith",age: 25,visits: "2025-01-01",progress: 80,status: 'single',},
                  ], 
                },
              ]
    },
    { firstName: '2Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    ...
]


2.0:columns dữ liệu cột được đưa vào

column = [
   {
        accessorKey: 'key of data',
        header: 'Chuỗi hiển thị lên header hoặc có thể sử dụng 1 đoạn mã JSX ',
        id: 'key of data', // bắt buộc phải có
        filterType: 'text of type filter', // có các dạng filter  (text, NumberFilter, DateFilter, DateTimeFilter, RangeFilter, CheckboxFilter)
        footer: info => `Count: ${CountFooter(info.table)}`, // có 3 loại footer (SumFooter, AverageFooter,CountFooter )
        cell: TextCell, // có thể lựa chọn các cell có sẵn ( TextCell,EditableCell,DateCell,DateUsCell,DateVnCell,DateTimeCell,DateTimeUsCell,DateTimeVnCell,NumberCell,NumberUsCell,NumberVnCell,TextCell,ExplandingDateCell,ExplandingTextCell,TextCellExplanding, ) hoặc tự xây dựng
        getGroupingValue: TextGroupCell,
        aggregatedCell:
        aggregationFn: // có các giá trị ('sum','min','mean')'count'
    },
    ...
]


The following aggregation functions are built-in to the table core:
aggregationFn:(
  sum -Sums the values of a group of rows
  min -Finds the minimum value of a group of rows
  max -Finds the maximum value of a group of rows
  extent -Finds the minimum and maximum values of a group of rows
  mean -Finds the mean/average value of a group of rows
  median -Finds the median value of a group of rows
  unique -Finds the unique values of a group of rows
  uniqueCount -Finds the number of unique values of a group of rows
  count -Calculates the number of rows in a group
)





ví dụ: colum không có parent header
const columns1headercof = [
    {

        accessorKey: 'firstName',
        header: 'First Name',
        id: 'firstName',
        filterType: 'text',
        footer: info => `Count: ${CountFooter(info.table)}`,
        cell: TextCell,
        getGroupingValue: TextGroupCell,
    },
    {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        header: () => <span>Last Name</span>,
        filterType: 'text',
        cell: (info) => info.getValue(),
    },

    {
        accessorKey: 'age',
        id: 'age',
        header: () => 'Age',
        footer: (info) => <div style={{
            textAlign: 'right',
        }}>{`Sum: ${formatNumber(SumFooter(info.column, info.table), 0, 2)}`}</div>,
        filterType: 'number',
        cell: ({ cell }) => (
            <NumberCell
                initialValue={cell.getValue()}
                minFractionDigits={0}
                maxFractionDigits={4}
            />),

        aggregatedCell: ({ cell }) => (
            <NumberCell
                initialValue={cell.getValue()}
                minFractionDigits={0}
                maxFractionDigits={4}
            />),
        aggregationFn: 'mean',
    },
    {
        accessorKey: 'visits',
        id: 'visits',
        header: () => <span>Visits</span>,
        cell: DateCell,
        filterType: 'date',
        // aggregationFn: 'sum',
        aggregationFn: 'count',
        aggregatedCell: ({ cell }) => (
            <NumberCell
                initialValue={cell.getValue()}
                minFractionDigits={0}
                maxFractionDigits={4}
            />),
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        cell: TextCell,
        filterType: 'range',
    },
    {
        accessorKey: 'progress',
        id: 'progress',
        header: 'Profile Progress',
        filterType: 'number',
        footer: (info) => `Average: ${formatNumber(AverageFooter(info.column, info.table), 0, 2)}`,
        cell: ({ getValue }) =>
            Math.round(getValue<number>() * 100) / 100 + '%',
        aggregationFn: 'mean',
        aggregatedCell: ({ getValue }) =>
            Math.round(getValue<number>() * 100) / 100 + '%',
    },
]