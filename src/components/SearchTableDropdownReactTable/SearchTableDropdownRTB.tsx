import React, { useState, useEffect, useRef } from 'react';
import { useTable } from 'react-table';
import './SearchTableDropdownRTB.css'; // Import CSS file

const SearchTableDropdownRTB = ({ data, columnDisplay, columnSearch, displayValue, DebounceTime, onItemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const debouncedsearchTerm = useDebounce(searchTerm, DebounceTime || 300);

  useEffect(() => {
    if (isFocused) {
      setShowList(!!debouncedsearchTerm);
      const filteredData = data.filter(item =>
        columnSearch.some(key => item[key].toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filteredData);
    }
  }, [debouncedsearchTerm, isFocused]);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      // Find the index of the currently selected item
      const currentIndex = filteredData.findIndex(item => item[displayValue] === searchTerm);
      if (e.key === 'ArrowUp') {
        setSelectedIndex(Math.max(currentIndex - 1, 0));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(Math.min(currentIndex + 1, filteredData.length - 1));
      }
    } else if (e.key === 'Enter') {
      // Handle selection when pressing Enter
      const selectedItem = filteredData[selectedIndex];
      handleSelectItem(selectedItem, selectedIndex);
      inputRef.current.blur();
      setShowList(false);
    }
  };

  const handleSelectItem = (item, index) => {
    setSearchTerm(item[displayValue]);
    if (onItemSelect) {
      onItemSelect(item);
    }
    setShowList(false);
  };

  const handleMouseDown = (e) => {
    if (listRef.current && !listRef.current.contains(e.target)) {
      setShowList(false);
    }
  };

  // Define columns for react-table
  const columns = Object.keys(columnDisplay).map(key => ({
    Header: columnDisplay[key],
    accessor: key,
  }));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: filteredData });

  return (
    <div className="container" onMouseDown={handleMouseDown}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="textboxsearch-style"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
      />
      {showList && (
        <div className="dropdown-container" ref={listRef}>
          <table className="dropdown-style" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={index === selectedIndex ? 'highlightkeymove' : ''}
                    onClick={() => handleSelectItem(row.original, index)}
                  >
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchTableDropdownRTB;
