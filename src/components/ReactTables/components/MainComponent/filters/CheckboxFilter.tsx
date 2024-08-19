import { useState, useRef, useEffect } from 'react';

function CheckboxFilter({ column }) {

    const handleHeaderCheckboxChange = (status) => {
 
            column.setFilterValue(status);
            column.columnDef.filterFn = CheckFn;
      };

    return (
        <div title="Filter Select" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <TriStateCheckbox onChange={handleHeaderCheckboxChange}></TriStateCheckbox>
        </div>

    )

}

export default CheckboxFilter;



function TriStateCheckbox({ onChange }) {
    const [state, setState] = useState('indeterminate'); // 'unchecked', 'checked', or 'indeterminate'
    const inputRef = useRef(null);

    useEffect(() => {
        const checkbox = inputRef.current;
        if (checkbox) {
            checkbox.indeterminate = state === 'indeterminate';
        }
    }, [state]);

    useEffect(() => {
        let value;
        switch (state) {
            case 'checked':
                value = true;
                break;
            case 'unchecked':
                value = false;
                break;
            case 'indeterminate':
                value = '';
                break;
            default:
                value = true;
        }
        onChange(value);
    }, [state]);

    const handleClick = () => {
        setState(prevState => {
            switch (prevState) {
                case 'unchecked':
                    return 'checked';
                case 'checked':
                    return 'indeterminate';
                case 'indeterminate':
                    return 'unchecked';
                default:
                    return prevState;
            }
        });
    };

    return (
        <input
            type="checkbox"
            ref={inputRef}
            checked={state === 'checked'}
            onClick={handleClick}
            readOnly
        />
    );
}


const CheckFn = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);

    switch (value) {
        case true:
            if (cellValue === value) {
                return true;
            }
            return false;
            break;
        case false:
            if (cellValue === value) {
                return true;
            }
            return false;
            break;
        default:
            return true;
    }
};
