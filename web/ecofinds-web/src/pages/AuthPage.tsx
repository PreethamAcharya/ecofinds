import React, { useState } from 'react';
import api from '../utils/api';

interface LoginResponse {
  token: string;
}

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const res = await api.post<LoginResponse>('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // Assuming you have a setAuthToken function in context or utils
      console.log('Login successful. Token saved.');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthPage;
