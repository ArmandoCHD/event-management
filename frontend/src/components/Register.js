import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Participante');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ username, email, password, role });
            console.log('Registration successful', response);
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error('Error during registration', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="Taquilla">Taquilla</option>
                        <option value="Organizador">Organizador</option>
                        <option value="Participante">Participante</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;
