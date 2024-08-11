import { SumFooter, AverageFooter, CountFooter } from './components/utils/Footer/FooterColumn'
import { TextCell } from './components/utils/cells/orinal/TextCell';
import { formatNumber, formatVnNumber, formatUsNumber, formatDate } from './components/utils/cells/orinal/fomatCell'
import { NumberUsCell, NumberVnCell, NumberCell } from './components/utils/cells/orinal/NumberCell';
import { DateVnCell, DateUsCell, DateCell } from './components/utils/cells/orinal/DateCell';
import { DateTimeCell, DateTimeVnCell } from './components/utils/cells/orinal/DateTimeCell';
import EditableCell from './components/utils/cells/edit/EditableCell';
import { ExplandingTextCell, TextCellExplanding, } from './components/utils/cells/orinal/ExplandingTextCell';
import { ExplandingDateCell } from './components/utils/cells/orinal/ExplandingDateCell';



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
                cell: TextCellExplanding,
                aggregatedCell: ExplandingTextCell,
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
                header: 'More Info',

                columns: [
                    {
                        accessorKey: 'visits',
                        id: 'visits',
                        header: () => <span>Visits</span>,
                        cell: DateVnCell,
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
// columnscof : co footer, columnskof: khong co footer, columnssubrowf: subrow co footer, columns1headercof
const columns = columnscof

export default columns;

