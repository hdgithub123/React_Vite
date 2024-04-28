
import SearchTableDropdown from './SearchTableDropdown';

const SearchTableDropdownEx = () => {
  const data = [
    { id: 1, name: 'John', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Alice', age: 25, email: 'alice@example.com' },
    // Các dữ liệu khác...
  ];

  const columnDisplay = ['name', 'age', 'email']; // Tên các cột sẽ hiển thị
  const columnSearch = ['name', 'email']; // Các cột được tìm kiếm

  return (
    <div>
      <h1>Search Component Example</h1>
      <SearchTableDropdown
       data={data}
       columnDisplay={columnDisplay}
       columnSearch={columnSearch}
      //  position="right" 
      />
    </div>
  );
};

export default SearchTableDropdownEx;

