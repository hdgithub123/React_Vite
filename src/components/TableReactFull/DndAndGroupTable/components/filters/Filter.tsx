import TextFilter from './TextFilter';
import NumberFilter from './NumberFilter';
import DateFilter from './DateFilter';
import DateTimeFilter from './DateTimeFilter';

function Filter({ column }) {
    const filterType = column.columnDef.filterType
    switch(filterType) {
        case 'text':
            return <TextFilter column={column}></TextFilter>
        case 'number':
            return <NumberFilter column={column}></NumberFilter>
        case 'date':
            return <DateFilter column={column}></DateFilter>
            case 'dateTime':
            return <DateTimeFilter column={column}></DateTimeFilter>
        default:
            return null;
        } 
}






export default Filter;