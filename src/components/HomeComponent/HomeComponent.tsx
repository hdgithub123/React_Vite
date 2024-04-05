import React from 'react';

// Khai báo kiểu dữ liệu cho props (nếu có)
interface HomeComponentProps {
  // Các props nếu cần
}




// HomeComponent là một Functional Component, sử dụng React.FC để xác định kiểu
const HomeComponent: React.FC<HomeComponentProps> = () => {
  return (
    <>
      <div>Home page</div>
    </>
  );
}

export default HomeComponent;

