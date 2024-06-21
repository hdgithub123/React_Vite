import { useState, useRef, useEffect } from 'react';

function CheckboxFilter({ column }) {

    const handleHeaderCheckboxChange = (status) => {
        switch (status) {
            case 'check':
                column.columnDef.filterFn = CheckFn;
              break;
            case 'uncheck':
                column.columnDef.filterFn = UnCheckFn;
              break;
            case 'indeterminate':
                column.columnDef.filterFn = indeterminateFn;
              break;
            default:
              console.log('Unknown Fn');
          }
      };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <TriStateCheckbox onChange={handleHeaderCheckboxChange}></TriStateCheckbox>
        </div>

    )

}

export default CheckboxFilter;


function TriStateCheckbox({ onChange }) {
    const [state, setState] = useState('unchecked'); // 'unchecked', 'checked', or 'indeterminate'
    const inputRef = useRef(null);

    useEffect(() => {
        const checkbox = inputRef.current;
        if (checkbox) {
            checkbox.indeterminate = state === 'indeterminate';
        }
    }, [state]);

    useEffect(() => {
        onChange(state);
    }, [state, onChange]);

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
    const cellValueStr = String(cellValue).toLowerCase();
    const valueStr = String(value).toLowerCase();

    if (valueStr === "check") {
        return cellValueStr === "check";
    } else {
        return false;
    }
};


const UnCheckFn = (row, columnId, value) => {
    const cellValue = row.getValue(columnId);
    const cellValueStr = String(cellValue).toLowerCase();
    const valueStr = String(value).toLowerCase();

    if (valueStr === "uncheck") {
        return cellValueStr === "uncheck";
    } else {
        return false;
    }
};

const indeterminateFn = (row, columnId, value) => {
    return true;
};
