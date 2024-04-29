
import SearchTableDropdown from './SearchTableDropdown';

const SearchTableDropdownEx = () => {
  const data = [
    { id: 2, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 3, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 4, name: 'Charlie', age: 35, email: 'charlie@example.com' },
    { id: 5, name: 'David', age: 40, email: 'david@example.com' },
    { id: 6, name: 'Eva', age: 45, email: 'eva@example.com' },
    { id: 7, name: 'Frank', age: 50, email: 'frank@example.com' },
    { id: 8, name: 'Grace', age: 55, email: 'grace@example.com' },
    { id: 9, name: 'Henry', age: 60, email: 'henry@example.com' },
    { id: 10, name: 'Ivy', age: 65, email: 'ivy@example.com' },
    { id: 11, name: 'Jack', age: 70, email: 'jack@example.com' },
    { id: 12, name: 'Kate', age: 75, email: 'kate@example.com' }
  ];

  const columnDisplay = {name:'ten', age: 'tuoi', email: 'email'}; // Tên các cột sẽ hiển thị
  const columnSearch = ['name', 'email']; // Các cột được tìm kiếm

  return (
    <div>
      <h1>Search Component Example</h1>
      <SearchTableDropdown
       data={data}
       columnDisplay={columnDisplay}
       columnSearch={columnSearch}
       position="abc" 
      />
    </div>
  );
};

export default SearchTableDropdownEx;

