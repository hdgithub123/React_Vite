import React, { useState, useEffect, useRef } from 'react';
import './SearchTableDropdown.css'; // Import CSS file

const SearchTableDropdown = ({ data, columnDisplay, columnSearch, displayValue, DebounceTime, onItemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Lưu trạng thái hàng được chọn
  const [showList, setShowList] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Trạng thái của ô tìm kiếm
  const [headerHeight, setHeaderHeight] = useState(0); // Chiều cao của header
  const inputRef = useRef(null); // Ref for input element
  const listRef = useRef(null); // Ref for list element

  const debouncedsearchTerm = useDebounce(searchTerm, DebounceTime || 300);

  useEffect(() => {
    if (isFocused) {
      setShowList(!!debouncedsearchTerm);
      const filteredData = data.filter(item =>
        columnSearch.some(key => item[key].toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filteredData);
    }
  }, [debouncedsearchTerm, isFocused, data, columnSearch, DebounceTime]);

  useEffect(() => {
    if (selectedIndex !== -1 && listRef.current) {
      const listItem = listRef.current.querySelector(`tr:nth-child(${selectedIndex + 1})`);
      if (listItem) {
        const listItemRect = listItem.getBoundingClientRect();
        const listContainerRect = listRef.current.getBoundingClientRect();
        // Tính toán chiều cao của header
        const theadHeight = listRef.current.querySelector('thead').getBoundingClientRect().height;
        setHeaderHeight(theadHeight);

        // Tính toán vị trí của dòng được highlight trong phần hiển thị trừ đi chiều cao của header
        const relativeTop = listItemRect.top - listContainerRect.top - headerHeight;
        if (relativeTop < 0 || relativeTop + listItemRect.height > listContainerRect.height - headerHeight) {
          listRef.current.scrollTop = listRef.current.scrollTop + relativeTop;
        }
      }
    }
  }, [selectedIndex, headerHeight]);

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
      if (e.key === 'ArrowUp') {
        setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(prevIndex => Math.min(prevIndex + 1, filteredData.length - 1));
      }
    } else if (e.key === 'Enter') {
      handleSelectItem(filteredData[selectedIndex], selectedIndex);
      inputRef.current.blur();
      setShowList(false);
    }
  };

  const handleSelectItem = (item, index) => {
    setSearchTerm(item[displayValue]);
    setSelectedIndex(index);
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
          <table className="dropdown-style">
            <thead>
              <tr>
                {Object.keys(columnDisplay).map((key, index) => (
                  <th key={index}>{columnDisplay[key]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={index === selectedIndex ? 'highlightkeymove' : ''}
                  onClick={() => handleSelectItem(item, index)}
                >
                  {Object.keys(columnDisplay).map((key, i) => (
                    <td key={i}>{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchTableDropdown;
