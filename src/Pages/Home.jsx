import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import { useEffect, useState } from "react";
import axios from 'axios';

const API_URL = "https://valfenda-api.onrender.com/api"

const Home = () => {
    const location = useLocation();
    const { name, email } = location.state || {};

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            const token = localStorage.getItem('token'); // Pegando o token do localStorage
            try {
                const response = await axios.get(`${API_URL}/authors`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Enviando o token no cabeçalho
                    }
                });
                setAuthors(response.data); // Armazenando os autores no estado
                setLoading(false); // Parando o loading
            } catch (e) {
                setError(`Erro ao carregar autores: ${e.message}`);
                setLoading(false); // Parando o loading em caso de erro
            }
        };
    
        fetchAuthors(); // Chamando a função ao montar o componente
    }, []);

    return (
        <>  
            <Navbar />
            <div className="container">
                <h1>Bem-vindo, {name}!</h1>
                <p>Email: {email}</p>
            </div>
            <div className="container">
                <h3>Autores:</h3>
                {loading && <p>Carregando autores...</p>} {/* Exibindo o loading */}
                {error && <p>{error}</p>} {/* Exibindo erro se houver */}
                {!loading && !error && (
                    <ul>
                        {authors.map((author) => (
                            <li key={author._id}>{author.name}</li> // Renderizando a lista de autores
                        ))}
                    </ul>
                )}
            </div>
            
        </>
    );
        
}

export default Home;
