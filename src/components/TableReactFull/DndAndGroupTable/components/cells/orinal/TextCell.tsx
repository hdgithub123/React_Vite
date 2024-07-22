export const TextCell = ({ getValue, row, column, table }) => {
    return <div style={{ 
        textAlign: 'Left',
        // whiteSpace: 'nowrap',
        // display: 'block',
        // maxWidth: '100px',
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
    }}>{getValue()}</div>;
};