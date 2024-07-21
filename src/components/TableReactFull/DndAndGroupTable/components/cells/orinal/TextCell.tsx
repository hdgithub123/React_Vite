export const TextCell = ({ getValue, row, column, table }) => {
    return <div style={{ textAlign: 'Left' }}>{getValue()}</div>;
};