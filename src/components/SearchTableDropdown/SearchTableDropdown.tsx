import { useState } from 'react';
import './SearchTableDropdown.css'; // Import CSS file

const SearchTableDropdown = ({ data, columnDisplay, columnSearch, displayValue }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Lưu trạng thái hàng được chọn
  const [showList, setShowList] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setShowList(!!value); // Hiển thị danh sách khi có giá trị trong ô tìm kiếm
    const filteredData = data.filter(item =>
      columnSearch.some(key => item[key].toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filteredData);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Giảm index, nhưng tối thiểu là 0
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex => Math.min(prevIndex + 1, filteredData.length - 1)); // Tăng index, nhưng tối đa là số lượng hàng - 1
    } else if (e.key === 'Enter') {
      handleSelectItem(filteredData[selectedIndex], selectedIndex); // Gọi hàm handleSelectItem với dòng được chọn
    }
  };

  const handleSelectItem = (item, index) => {
    setSearchTerm(item[displayValue]); // Reset giá trị ô tìm kiếm khi chọn item
    setShowList(false); // Ẩn danh sách
    setSelectedIndex(index); // Lưu trạng thái hàng được chọn
    console.log(item);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown} // Lắng nghe sự kiện phím mũi tên và Enter
        placeholder="Search..."
        className="textboxsearch-style"
      />
      {showList && (
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
      )}
    </div>
  );
};

export default SearchTableDropdown;
