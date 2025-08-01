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
   {
    ReactTableBasic,
    ReactTableBasicArrowkey,
    ReactTableFull,
    ReactTableFullArrowkey,
    ReactTableNomalArrowkey,
    ReactTablePages,
    SearchDropDown,
   } 
    

Input:
{ 
data,
columns, 
columnsShow={['firstName', 'age', 'lastName','progress', 'status']} // các trường hiển thị lần đầu render sẽ hiển thị đúng thứ tự
onDataChange, 
onRowSelect, 
onRowsSelect, 
onVisibleColumnDataSelect, 
grouped = [], 
exportFile = { name: "Myfile.xlsx", sheetName: "Sheet1", title: null, description: null }, 
isGlobalFilter = false 
} 


SearchDropDown(
    {
    data,
    columns,
    onRowSelect,
    columnDisplay, 
    cssStyleTable = null, 
    cssStyleTextFilter = null, 
    }
    )




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
        filterType: 'text of type filter', // có các dạng filter  (text, number, date, dateTime, range, checkbox,multiSelect)
        footer: info => `Count: ${CountFooter(info.table)}`, // có 3 loại footer (SumFooter, AverageFooter,CountFooter )
        cell: TextCell, // có thể lựa chọn các cell có sẵn ( TextCell,EditableCell,DateCell,DateUsCell,DateVnCell,DateTimeCell,DateTimeUsCell,DateTimeVnCell,NumberCell,NumberUsCell,NumberVnCell,ExplandingDateCell,ExplandingTextCell,TextCellExplanding, ) hoặc tự xây dựng
        groupCell: TextGroupCell,
        aggregatedCell:
        aggregationFn: // có các giá trị ('sum','min','mean'...)
        enableGlobalFilter: false, // khong cho GlobalFilter thì thêm thuộc tính này
    },
    ...
]

filter:  (text, number, date, dateTime, range, checkbox,multiSelect) //checkbox cho các  giá trị true/false
footer: (
    SumFooter: info => {`Sum: ${SumFooter(info.column, info.table,0,2)}`} 
    AverageFooter: info => {`Average: ${AverageFooter(info.column, info.table,1,2)}`}
    CountFooter:  info => `Count: ${CountFooter(info.table)}`
)


cell: ( 
  TextCell,
  EditableCell,
  DateCell,
  DateUsCell,
  DateVnCell,
  DateTimeCell,
  DateTimeUsCell,
  DateTimeVnCell,
  NumberCell,
  NumberUsCell,
  NumberVnCell,
)
với NumberCell,NumberUsCell,NumberVnCell phải được khai báo  
            cell: ({ cell }) => (
                    <NumberCell
                        initialValue={cell.getValue()}
                        minFractionDigits={0}
                        maxFractionDigits={4}
                        option={{style: 'percent'}} //option có 4 dạng mặc định là decimal { style: 'decimal' }, currency: { style: 'currency', currency: 'USD' }, percent: {style: 'percent'} ,unit: { style: 'unit', unit: 'kg' }
                    />),




groupCell và aggregatedCell có thể dùng các cell trên và dùng các Cell có tính chất riêng biệt cho từng loại
groupCell:(
  TextGroupCell, // bổ sung số lượng subRows
  và các cell của cell, 
)

aggregatedCell:(
  ExplandingDateCell,
  ExplandingTextCell, // bổ sung nút Expland
 và các cell của cell, // nhưng không có thêm nút expland
)

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


Với colum có parent header
mẫu
columnhaveHeader = [
    {   header: 'Grand Parent Name',
        [{ header: 'Parent Name',
            [{
                (child colum)
            },
            {
                (child colum)
            }]
        },
        {
            (child colum)
        }],

    },
    {

    },
    {

    }
]


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


ví dụ colum có parent header

const column = [
    {
        header: 'Name',
        columns: [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                id: 'firstName',
                filterType: 'text',
                footer: info => `Count: ${formatNumber(CountFooter(info.table),0,2)}`,
                // footer: CountFooter,
                cell: TextCell,
                groupCell: TextGroupCell, // bo sung group cell
                //cell: (info) => info.getValue(),
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                // enableGlobalFilter: false,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                filterType: 'text',
                cell: (info) =>  info.getValue(),
                groupCell: TextGroupCell,
            },
        ],
    },
    {
        header: 'Info',
        columns: [
            {
                accessorKey: 'age',
                id: 'age',
                // header: () => 'Age',
                header: 'Age',

                footer: (info) => <div style={{
                    textAlign: 'right',
                }}>{`Sum: ${formatNumber(SumFooter(info.column, info.table), 0, 2)}`}</div>,


                // footer: SumFooter,


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
                header: 'More Info',

                columns: [
                    {
                        accessorKey: 'visits',
                        id: 'visits',
                        // header: () => <span>Visits</span>,
                        header: 'Visits',
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
                        //aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
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
                        // footer: AverageFooter,
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
]