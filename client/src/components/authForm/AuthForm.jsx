import React, { useState } from 'react';
import axios from 'axios';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/token/' : '/api/register/';
    const payload = { username, password };

    try {
      const res = await axios.post(`http://localhost:8000${endpoint}`, payload);

      if (isLogin) {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        setMessage('Login successful!');
      } else {
        setMessage('Registration successful. You can log in now.');
        setIsLogin(true);
      }
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.detail || 'Something went wrong'));
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text" value={username} placeholder="Username"
          onChange={(e) => setUsername(e.target.value)} required
        />
        <input
          type="password" value={password} placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create account' : 'Already have an account?'}
      </button>
    </div>
  );
}

export default AuthForm;
