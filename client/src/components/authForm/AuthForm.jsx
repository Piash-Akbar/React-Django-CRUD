import React, { useEffect, useState } from 'react';
import { useDjango } from '../../context/DjangoContext';
// import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  // const [token,setToken] = useCookies(['tokenCookie']);
  const navigate = useNavigate();

  const { loginUser, registerUser,tokenCookie,setTokenCookie } = useDjango();


  useEffect(() => {
    if (tokenCookie.tokenCookie) {
      navigate('/');
    }
  }, [tokenCookie, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await loginUser({ username,email, password });
        setTokenCookie('tokenCookie', response.token);
        setMessage(response.message);
      } else {
        const response = await registerUser({ username,email, password });

        setTokenCookie('tokenCookie', response.token);
        setMessage(response.message);
        
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again.');
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
          type="email" value={email} placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} 
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

export default AuthForm
