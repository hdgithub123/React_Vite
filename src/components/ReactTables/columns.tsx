import { SumFooter, AverageFooter, CountFooter } from './components/Footer/FooterColumn'
import { SumExpandingFooter,AverageExpandingFooter,CountExpandingFooter } from './components/Footer/FooterExpandingColumn';
import { TextCell } from './components/cells/orinal/TextCell';
import { NumberUsCell, NumberVnCell, NumberCell, formatNumber, formatVnNumber,formatUsNumber } from './components/cells/orinal/NumberCell';
import { DateVnCell,DateUsCell, DateCell } from './components/cells/orinal/DateCell';
import { DateTimeCell,DateTimeVnCell } from './components/cells/orinal/DateTimeCell';
import EditableCell from './components/cells/edit/EditableCell';



const ExplandingCell = ({ row , getValue }) => {
    return (
        <div
          style={{
            // paddingLeft: `${row.depth * 2}rem`,
            paddingLeft: `${row.depth}rem`,
          }}
        >
          <div>
            {row.getCanExpand() ? (
              <button
                {...{
                  onClick: row.getToggleExpandedHandler(),
                  style: { cursor: 'pointer', background: 'none', border:'none' },
                }}
              >
                {row.getIsExpanded() ? '⮞' : '⮟'}
              </button>
            ) : (
              ''
            )}{' '}
            {getValue<boolean>()}
          </div>
        </div>
      )
}

// const ExplandingCell = ({ row, getValue }) => {
//     return (
//         <div
//           style={{
//             paddingLeft: `${row.depth * 2}rem`,
//           }}
//         >
//           <div>
//               <button
//                 {...{
//                   onClick: row.getToggleExpandedHandler(),
//                   style: { cursor: 'pointer' },
//                 }}
//               >
//                 {row.getIsExpanded() ? '' : '⮚'}
//               </button>
//             {getValue<boolean>()}
//           </div>
//         </div>
//       )
// }




// const columns = 
//  [
//         {
//             accessorKey: 'firstName',
//             id: 'firstName',
//             header: 'First Name',
//             footer: info => `Count: ${calculateRowCount(info.table)}`,
//             filterType: 'text',
//             cell: info => info.getValue(),
//         },
//         {
//             accessorFn: row => row.lastName,
//             id: 'lastName',
//             filterType: 'text',
//             header: () => <span>Last Name</span>,
//             cell: info => info.getValue(),
//         },
//         {
//             accessorKey: 'age',
//             id: 'age',
//             filterType: 'number',
//             header: () => 'Age',
//             footer: (info) =>`Average: ${calculateColumnAverage(info.column, info.table)}`,
//             aggregatedCell: ({ getValue }) =>
//                 Math.round(getValue<number>() * 100) / 100,
//             aggregationFn: 'median',
//         },
//         {
//             accessorKey: 'visits',
//             id: 'visits',
//             filterType: 'date',
//             header: () => <span>Visits</span>,
//             aggregationFn: 'sum',
//             aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
//         },
//         {
//             accessorKey: 'status',
//             id: 'status',
//             filterType: 'range',
//             size: 150,
//             header: 'Status',
//         },
//         {
//             accessorKey: 'progress',
//             id: 'progress',
//             filterType: 'number',
//             header: 'Profile Progress',
//             cell: ({ getValue }) =>
//                 Math.round(getValue<number>() * 100) / 100 + '%',
//             aggregationFn: 'mean',
//             aggregatedCell: ({ getValue }) =>
//                 Math.round(getValue<number>() * 100) / 100 + '%',
//         },


// ]


const columnscof = [
    {
        header: 'Name',
        columns: [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                id: 'firstName',
                filterType: 'text',
                // footer: info => `Count: ${CountFooter(info.table)}`,
                footer: info =>`Count: ${CountFooter(info.table)}`,
                cell: TextCell,
                //cell: (info) => info.getValue(),
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                filterType: 'text',
                cell: (info) => info.getValue(),
            },
        ],
    },
    {
        header: 'Info',
        columns: [
            {
                accessorKey: 'age',
                id: 'age',
                header: () => 'Age',
                footer: (info) => <div style={{ 
                    textAlign: 'right',
                }}>{`Sum: ${formatNumber(SumFooter(info.column, info.table),0,2)}`}</div> ,
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


                // aggregatedCell: ({ getValue }) =>
                //     Math.round(getValue<number>() * 100) / 100,
                aggregationFn: 'mean',
            },
            {
                header: 'More Info',

                columns: [
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
                        footer: (info) => `Average: ${formatNumber(AverageFooter(info.column, info.table),0,2)}`,
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

// khong co footer
const columnskof = [
    {
        header: 'Name',
        columns: [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                id: 'firstName',
                filterType: 'text',
                cell: (info) => info.getValue(),
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                filterType: 'text',
                cell: (info) => info.getValue(),
            },
        ],
    },
    {
        header: 'Info',

        columns: [
            {
                accessorKey: 'age',
                id: 'age',
                header: () => 'Age',
                filterType: 'number',
                aggregatedCell: ({ getValue }) =>
                    Math.round(getValue<number>() * 100) / 100,
                aggregationFn: 'median',
            },
            {
                header: 'More Info',

                columns: [
                    {
                        accessorKey: 'visits',
                        id: 'visits',
                        header: () => <span>Visits</span>,
                        filterType: 'date',
                        aggregationFn: 'sum',
                        aggregatedCell: ({ getValue }) => getValue().toLocaleString(),
                    },
                    {
                        accessorKey: 'status',
                        id: 'status',
                        header: 'Status',
                        filterType: 'range',
                    },
                    {
                        accessorKey: 'progress',
                        id: 'progress',
                        header: 'Profile Progress',
                        filterType: 'number',
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

const columnssubrowf= [
    {
        header: 'Name',
        columns: [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                id: 'firstName',
                filterType: 'text',
                // footer: info => `Count: ${CountFooter(info.table)}`,
                footer: info =>`Count: ${CountExpandingFooter(info.table)}`,
                cell: (info) => <div 
                                    style={{paddingLeft: `${info.row.depth*20}px`,}}> {info.getValue()}
                                </div> ,
                aggregatedCell: ExplandingCell,
                // aggregationFn: 'count',
                //cell: (info) => info.getValue(),
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                filterType: 'text',
                cell: (info) => info.getValue(),
            },
        ],
    },
    {
        header: 'Info',
        columns: [
            {
                accessorKey: 'age',
                id: 'age',
                header: () => 'Age',
                footer: (info) => <div style={{ 
                    textAlign: 'right',
                }}>{`Sum: ${formatNumber(SumExpandingFooter(info.column, info.table),0,2)}`}</div> ,
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


                // aggregatedCell: ({ getValue }) =>
                //     Math.round(getValue<number>() * 100) / 100,
                aggregationFn: 'mean',
            },
            {
                header: 'More Info',

                columns: [
                    {
                        accessorKey: 'visits',
                        id: 'visits',
                        header: () => <span>Visits</span>,
                        cell: DateCell,
                        filterType: 'date',
                        // aggregationFn: 'sum',
                        aggregationFn: 'count',
                       aggregatedCell: DateCell,
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
                        footer: (info) => `Average: ${formatNumber(AverageExpandingFooter(info.column, info.table),0,2)}`,
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
const columns = columnssubrowf
export default columns;

