import { useState, useRef, useEffect } from 'react';

function DateFilter({ column }) {
    const [filterFn, setFilterFn] = useState('');
    useEffect(() => {
        setFilterFn('EqualsDate');
        column.columnDef.filterFn = EqualsDate;
    }, []);

    const FilterValue = useRef(null);
    const handleFilterChange = (e) => {
        setFilterFn(e.target.value);
        switch (e.target.value) {
            case 'EqualsDate':
                column.columnDef.filterFn = EqualsDate;
                break;
            case 'weakEqualsDate':
                column.columnDef.filterFn = weakEqualsDate;
                break;
            case 'weakDate':
                column.columnDef.filterFn = weakDate;
                break;
            case 'GreaterEqualsDate':
                column.columnDef.filterFn = GreaterEqualsDate;
                break;
            case 'GreaterDate':
                column.columnDef.filterFn = GreaterDate;
                break;
            case 'DifferentDate':
                column.columnDef.filterFn = DifferentDate;
                break;
            default:
                column.columnDef.filterFn = e.target.value;
        }

        if (FilterValue.current) {
            column.setFilterValue(FilterValue.current);
        } else {
            column.setFilterValue(undefined); // or handle the empty case as needed
        }
    };

    function handelOnChange(e) {
        column.setFilterValue(e.target.value) //ok đưa giá trị vào ô filter value
        FilterValue.current = e.target.value
    }
    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
            <input
                type="date"
                style={{ width: 'calc(100% - 35px)', marginRight: '2px'}}
                value={column.getFilterValue() || ''}
                onChange={handelOnChange}
                placeholder='Search...'
            />
            <select style={{ width: '33px' }} value={filterFn} onChange={handleFilterChange}>
                <option value="EqualsDate" title="Equal">=</option>
                <option value="weakEqualsDate" title="Weak Equal">{'≤'}</option>
                <option value="weakDate" title="Weak">{'<'}</option>
                <option value="GreaterEqualsDate" title="Greater Equal">{'≥'}</option>
                <option value="GreaterDate" title="Greater">{'>'}</option>
                <option value="DifferentDate" title="Different">{'≠'}</option>
            </select>
        </div>

    )

}

export default DateFilter;


const EqualsDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() === dateValue.getTime();
    }

    return false;
};


const weakEqualsDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() <= dateValue.getTime();
    }

    return false;
};

const weakDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() < dateValue.getTime();
    }

    return false;
};


const GreaterEqualsDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() >= dateValue.getTime();
    }

    return false;
};

const GreaterDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() > dateValue.getTime();
    }

    return false;
};


const DifferentDate = (row, columnId, value) => {
    const cellValue = new Date(row.getValue(columnId));
    const dateValue = new Date(value);

    if (!isNaN(cellValue.getTime()) && !isNaN(dateValue.getTime())) {
        return cellValue.getTime() != dateValue.getTime();
    }

    return false;
};


