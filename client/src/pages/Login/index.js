import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useHistory, Redirect } from 'react-router-dom'
import Cookie from 'js-cookie';
import { AuthContext } from '../../context/AuthContext'
import './index.css'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useContext(AuthContext);
    const history = useHistory();

    if (Cookie.get('jwt_token') !== undefined) return <Redirect to="/" />;

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            loginUser(response.data.user, response.data.token);
            history.push('/');
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="auth-bg">
            <form className="auth-card" onSubmit={onLogin}>
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
                <p>New here? <span onClick={() => history.push('/register')}>Register</span></p>
            </form>
        </div>
    );
};
export default Login;