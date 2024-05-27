import React from 'react';
import GeneralTable from './GeneralTable'; // Đảm bảo đường dẫn đúng tới component Table


const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    return (
      <span>
        Search:{' '}
        <input
          value={filterValue || ''}
          onChange={e => setFilter(e.target.value)}
        />
      </span>
    )
  }


const GeneralTableEX = () => {
    const columns = React.useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'id',
            // Bổ sung thêm thông tin về cột, ví dụ như kiểu dữ liệu
            dataType: 'number',
            // Bổ sung các thuộc tính khác nếu cần
            Filter: ColumnFilter,
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} id`,
          },
          {
            Header: 'Name',
            accessor: 'name',
            // Bổ sung thêm thông tin về cột, ví dụ như kiểu dữ liệu
            dataType: 'string',
            // Bổ sung các thuộc tính khác nếu cần
            Filter: ColumnFilter,
            aggregate: 'uniqueCount',
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
          {
            Header: 'Age',
            accessor: 'age',
            // Bổ sung thêm thông tin về cột, ví dụ như kiểu dữ liệu
            dataType: 'number',
            // Bổ sung các thuộc tính khác nếu cần
            Filter: ColumnFilter,
            aggregate: 'average',
            Aggregated: ({ value }) => `${Math.round(value * 100) / 100} (avg)`,
          },
          {
            Header: 'Gender',
            accessor: 'gender',
            // Bổ sung thêm thông tin về cột, ví dụ như kiểu dữ liệu
            dataType: 'string',
            // Bổ sung các thuộc tính khác nếu cần
            Filter: ColumnFilter,
            aggregate: 'sum',
            Aggregated: ({ value }) => `${value} (total)`,
          },
        ],
        []
      );

  const data = React.useMemo(
    () => [
      { id: 1, name: 'John Doe', age: 25, gender: 'Male' },
      { id: 2, name: 'Jane Smith', age: 30, gender: 'Female' },
      { id: 3, name: 'Bob Johnson', age: 35, gender: 'Male' },
      { id: 4, name: 'Alice Johnson', age: 28, gender: 'Female' },
      { id: 5, name: 'Michael Brown', age: 40, gender: 'Male' },
      { id: 6, name: 'Emily Davis', age: 22, gender: 'Female' },
      { id: 7, name: 'David Wilson', age: 33, gender: 'Male' },
      { id: 8, name: 'Olivia Martinez', age: 27, gender: 'Female' },
      { id: 9, name: 'Daniel Taylor', age: 36, gender: 'Male' },
      { id: 10, name: 'Sophia Anderson', age: 29, gender: 'Female' },
      { id: 1, name: 'John Doe', age: 25, gender: 'Male' },
      { id: 2, name: 'Jane Smith', age: 30, gender: 'Female' },
      { id: 3, name: 'Bob Johnson', age: 35, gender: 'Male' },
      { id: 4, name: 'Alice Johnson', age: 28, gender: 'Female' },
      { id: 5, name: 'Michael Brown', age: 40, gender: 'Male' },
      { id: 6, name: 'Emily Davis', age: 22, gender: 'Female' },
      { id: 7, name: 'David Wilson', age: 33, gender: 'Male' },
      { id: 8, name: 'Olivia Martinez', age: 27, gender: 'Female' },
      { id: 9, name: 'Daniel Taylor', age: 36, gender: 'Male' },
      { id: 10, name: 'Sophia Anderson', age: 29, gender: 'Female' },
    ],
    []
  );

  return (
    <div>
      <h1>Example Table</h1>
      <GeneralTable columns={columns} data={data} />
    </div>
  );
};

export default GeneralTableEX;
