import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface LoginData {
  username: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: ''
  });

  const [cookies, setCookie] = useCookies(['token']);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login/authenticate', loginData);
      console.log('Login successful:', response.data);

      if (response.data.success && response.data.token) {
        // Lưu token vào cookie
        setCookie('token', response.data.token, { path: '/' });
        console.log('Token saved:', response.data.token);

        // Chuyển hướng đến trang "home" sau khi đăng nhập thành công
        window.location.href = '/home';
      } else {
        console.error('Login failed:', 'Invalid response');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={loginData.username} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
