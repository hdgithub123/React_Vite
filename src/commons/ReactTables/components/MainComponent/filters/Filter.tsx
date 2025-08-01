import TextFilter from './TextFilter';
import NumberFilter from './NumberFilter';
import DateFilter from './DateFilter';
import DateTimeFilter from './DateTimeFilter';
import RangeFilter from './RangeFilter';
import CheckboxFilter from './CheckboxFilter';
import MultiSelectFilter from './MultiSelectFilter'

function Filter({ column }) {
    const filterType = column.columnDef.filterType
    switch (filterType) {
        case 'text':
            return <TextFilter column={column}></TextFilter>
        case 'number':
            return <NumberFilter column={column}></NumberFilter>
        case 'date':
            return <DateFilter column={column}></DateFilter>
        case 'dateTime':
            return <DateTimeFilter column={column}></DateTimeFilter>
        case 'range':
            return <RangeFilter column={column}></RangeFilter>
        case 'checkbox':
            return <CheckboxFilter column={column}></CheckboxFilter>
        case 'multiSelect':
            return <MultiSelectFilter column={column}></MultiSelectFilter>
        default:
            return null;
    }
}
export default Filter;