import '../css/SignUpLogin.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://valfenda-api.vercel.app/api'; 

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        return name.trim() !== '' && email.trim() !== '' && password.trim() !== '';
    };

    async function submit(e) {
        e.preventDefault();
        if (!validateForm()) {
            setError('Todos os campos são obrigatórios');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/users/signup`, { name, email, password });
            if (response.data === 'exist') {
                setError('Usuário já existe');
            } else {
                navigate('/home', { state: { id: name } });
            }
        } catch (e) {
            if (e.response && e.response.status === 403) {
                setError("O número máximo de usuários foi atingido.");
            } else {
                setError("Erro ao tentar criar a conta.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card card-responsive">
                <div className="form px-4">
                    <h3 className="text-center mb-4">SIGN UP</h3>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Nome</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" id="inputName" placeholder="Nome" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="inputEmail" placeholder="Email" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Senha</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="inputPassword" placeholder="Senha" required />
                        </div>
                        <button className="btn btn-dark btn-block w-100" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Sign up'}
                        </button>
                    </form>
                    <div className="container d-flex justify-content-start align-items-center mt-3">
                        <p className="mb-0">Já tem uma conta?</p>
                        <Link to='/login' className="btn button-link">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
