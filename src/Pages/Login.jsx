import '../css/SignUpLogin.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../AuthContext';

const isLocalhost = window.location.hostname === "localhost";

const API_URL = isLocalhost ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_API_URL;

console.log(API_URL)
const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Pegando a função de login do contexto
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        return email.trim() !== '' && password.trim() !== '';
    };

    const submit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setError('Email e senha são obrigatórios');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/users/login`, { email, password });

            if (response.status === 200 && response.data.user) {
                const userName = response.data.user.name;
                const token = response.data.token;

                if (token && typeof token === 'string') {
                    // Armazenando o token e dados do usuário no contexto
                    login({ name: userName, email, token });

                    navigate('/home', { state: { name: userName, email } });
                } else {
                    setError('Erro ao armazenar o token');
                }
            } else {
                setError('Erro: Usuário não encontrado');
            }
        } catch (e) {
            console.error('Error caught:', e);
            if (e.response && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError('Erro ao tentar fazer login');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card bg-white card-responsive">
                <div className="form px-4">
                    <h3 className="text-center mb-4">LOGIN</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Senha</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="form-control"
                                id="inputPassword"
                                placeholder="Senha"
                                required
                            />
                        </div>
                        <button className="btn btn-dark btn-block w-100" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </button>
                    </form>
                    <div className="container d-flex justify-content-start align-items-center mt-3">
                        <p className="mb-0">Não tem uma conta?</p>
                        <Link to='/signup' className="btn button-link">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
