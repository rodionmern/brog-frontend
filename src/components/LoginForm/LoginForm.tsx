import './LoginForm.css'

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

const LoginForm = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username == '' || password == '') {
            setError('Credentials are required')
        } else {
            try {
                const responce =  await login(username, password);
                if (responce.username == 'rodsagrian') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            } catch (err) {
                console.log('Login error: ', err) 
            }
        }
    };

    return (
        <>
        <h2>Admin-panel login</h2>
        <form onSubmit={handleSubmit} className="login-form">
            <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
            <p className='error-text'>{error}</p>
        </form>
        </>
    )
}

export default LoginForm