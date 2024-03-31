import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterComponent.css';

interface FormData {
  username: string;
  password: string;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  avatar: File | null;
}

const RegisterComponent: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    email: '',
    avatar: null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      avatar: file
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = {
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        avatar: formData.avatar || ""
      };

      const response = await axios.post('http://localhost:3000/user/detail', formDataToSend);
      console.log('Register successful:', response.data);

      // Chuyển hướng đến trang "home" sau khi đăng ký thành công
      navigate('/home');
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterComponent;
