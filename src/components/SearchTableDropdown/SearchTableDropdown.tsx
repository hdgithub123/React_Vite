import React, { useState } from 'react';

const SearchTableDropdown = ({ data, columnDisplay, columnSearch, position }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowList(!!value); // Hiển thị danh sách khi có giá trị trong ô tìm kiếm
    const filteredData = data.filter(item =>
      columnSearch.some(key => item[key].toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filteredData);
  };

  const handleSelectItem = (item) => {
    console.log(item); // Thực hiện xử lý khi một item được chọn
    setSearchTerm(''); // Reset giá trị ô tìm kiếm khi chọn item
    setShowList(false); // Ẩn danh sách
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return { top: '-150%', left: '0' };
      case 'left':
        return { top: '0', left: '-150%' };
      case 'right':
        return { top: '0', left: '100%' };
      default:
        return { top: '100%', left: '0' }; // Mặc định hiển thị ở dưới
    }
  };

  const dropdownStyle = position ? { position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', width: '100%', ...getPositionStyle() } : { position: 'absolute', backgroundColor: 'white', border: '1px solid #ccc', width: '100%', top: '100%', left: '0' };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      {showList && (
        <div style={dropdownStyle}>
          {filteredData.map((item, index) => (
            <div key={index} onClick={() => handleSelectItem(item)}>
              {columnDisplay.map((key, i) => (
                <span key={i}>{item[key]}</span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchTableDropdown;
