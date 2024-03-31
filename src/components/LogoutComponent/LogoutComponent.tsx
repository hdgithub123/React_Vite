import React from 'react';
import { useCookies } from 'react-cookie';

const LogoutComponent: React.FC = () => {
  const [, , removeCookie] = useCookies(['token']);

  const handleLogout = () => {
    // Xóa cookie có tên 'token'
    removeCookie('token', { path: '/' });

    // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    window.location.href = '/login';
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutComponent;
