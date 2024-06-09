import TextFilter from './TextFilter';

function Filter({ column }) {
    const filterType = column.columnDef.filterType
    switch(filterType) {
        case 'text':
            return <TextFilter column={column}></TextFilter>
        case 'number':
            return null;
        case 'date':
            return null;
        default:
            return null;
        } 
}






export default Filter;