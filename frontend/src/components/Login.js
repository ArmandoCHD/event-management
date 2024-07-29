import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            console.log('Login successful', response);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
