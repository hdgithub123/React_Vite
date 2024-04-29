import { useState } from 'react';
import './SearchTableDropdown.css'; // Import CSS file

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

  const dropdownClasses = ['dropdown-style'];
  if (position) {
    dropdownClasses.push(`dropdown-${position}`);
  } else {
    dropdownClasses.push('dropdown-bottom');
  }

  return (
    <div className={'container'}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className={'textboxsearch-style'}
      />
      {showList && (
        <table className={dropdownClasses.join(' ')}>
          <thead>
            <tr>
              {Object.keys(columnDisplay).map((key, index) => (
                <th key={index}>{columnDisplay[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} onClick={() => handleSelectItem(item)}>
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
