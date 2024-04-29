import React, { useState, useEffect, useRef } from 'react';
import './SearchTableDropdown.css'; // Import CSS file

const SearchTableDropdown = ({ data, columnDisplay, columnSearch, displayValue, DebounceTime, onItemSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Lưu trạng thái hàng được chọn
  const [showList, setShowList] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Trạng thái của ô tìm kiếm
  const inputRef = useRef(null); // Ref for input element
  const listRef = useRef(null); // Ref for list element

  useEffect(() => {
    // Define a timer variable
    let timer;

    // Set a delay of 300ms after the user stops typing before executing the search
    timer = setTimeout(() => {
      if (isFocused) { // Only show the list if the input is focused
        setShowList(!!searchTerm); // Hiển thị danh sách khi có giá trị trong ô tìm kiếm
        const filteredData = data.filter(item =>
          columnSearch.some(key => item[key].toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredData(filteredData);
      }
    }, DebounceTime || 300); // Use DebounceTime if provided, otherwise default to 300

    // Cleanup function to clear the timer on component unmount or when searchTerm changes
    return () => clearTimeout(timer);
  }, [searchTerm, isFocused, data, columnSearch, DebounceTime]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Giảm index, nhưng tối thiểu là 0
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, filteredData.length - 1)); // Tăng index, nhưng tối đa là số lượng hàng - 1
    } else if (e.key === 'Enter') {
      handleSelectItem(filteredData[selectedIndex], selectedIndex); // Gọi hàm handleSelectItem với dòng được chọn
      inputRef.current.blur(); // Remove focus from the input field
      setShowList(false); // Hide the list
    }
  };

  const handleSelectItem = (item, index) => {
    setSearchTerm(item[displayValue]); // Reset giá trị ô tìm kiếm khi chọn item
    setSelectedIndex(index); // Lưu trạng thái hàng được chọn
    if (onItemSelect) {
      onItemSelect(item); // Call the callback function with the selected item
    }
    setShowList(false); // Hide the list
  };

  // Xử lý sự kiện click chuột ra ngoài
  const handleMouseDown = (e) => {
    if (listRef.current && !listRef.current.contains(e.target)) {
      setShowList(false); // Ẩn danh sách nếu click ra ngoài phần tử danh sách
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
        onFocus={() => setIsFocused(true)} // Set isFocused to true when input is focused
        onBlur={() => setIsFocused(false)} // Set isFocused to false when input loses focus
        ref={inputRef} // Assign ref to the input element
      />
      {showList && (
        <table className="dropdown-style" ref={listRef}>
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
      )}
    </div>
  );
};

export default SearchTableDropdown;
