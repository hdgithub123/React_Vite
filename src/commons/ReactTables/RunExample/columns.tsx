import { SumFooter, AverageFooter, CountFooter } from '../components/utils/Footer/FooterColumn'

import { formatNumber, formatVnNumber, formatUsNumber, formatDate } from '../components/utils/Others/fomatCell'

import {
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
    TextCell,
    TextGroupCell,
    ExplandingDateCell,
    ExplandingTextCell,
} from '../components/utils/cells'




const columnscof = [
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
                enableHiding: true,
           
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

const columns1headercof = [
    {

        accessorKey: 'firstName',
        header: 'First Name',
        id: 'firstName',
        filterType: 'text',
        // footer: info => `Count: ${CountFooter(info.table)}`,
        footer: info => `Count: ${CountFooter(info.table)}`,
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


        // aggregatedCell: ({ getValue }) =>
        //     Math.round(getValue<number>() * 100) / 100,
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
        cell: ({ getValue }) =>
            Math.round(getValue<number>() * 100) / 100 + '%',
        aggregationFn: 'mean',
        aggregatedCell: ({ getValue }) =>
            Math.round(getValue<number>() * 100) / 100 + '%',
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

const columnssubrowf = [
    {
        header: 'Name',
        columns: [
            {
                accessorKey: 'firstName',
                header: 'First Name',
                id: 'firstName',
                filterType: 'text',
                // footer: info => `Count: ${CountFooter(info.table)}`,
                footer: info => `Count: ${CountFooter(info.table)}`,
                cell: TextCell,
                aggregatedCell: ExplandingTextCell,
                // aggregationFn: 'count',
                //cell: (info) => info.getValue(),
                /**
                 * override the value used for row grouping
                 * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                 */
                // getGroupingValue: (row) => `${row.firstName} ${row.lastName}`,
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                header: () => <span>Last Name</span>,
                filterType: 'multiSelect',
                cell: TextCell,
                aggregatedCell: TextCell,
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
            }}>{`Sum: ${SumFooter(info.column, info.table,1,2)}`}</div>,
                filterType: 'number',
                cell: ({ cell }) => (
                    <NumberCell
                        initialValue={cell.getValue()}
                        minFractionDigits={0}
                        maxFractionDigits={4}
                        option={{style: 'percent'}}
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
                        // aggregationFn: 'count',
                        aggregatedCell: ExplandingDateCell,
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
// columnscof : co footer, columnskof: columns1headercof, khong co footer, columnssubrowf: subrow co footer, 
export const columns = columnssubrowf
export const columns2 = columnskof


