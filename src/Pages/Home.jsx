import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import { useEffect, useState } from "react";
import axios from 'axios';

const isLocalhost = window.location.hostname === "localhost";

const API_URL = isLocalhost ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_API_URL;


const Home = () => {
    const location = useLocation();
    const { name, email } = location.state || {};

    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            const token = localStorage.getItem('token'); // Recupera o token armazenado
            try {
                const response = await axios.get(`${API_URL}/authors`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
                    },
                });
                setAuthors(response.data);
                setLoading(false);
            } catch (e) {
                setError(`Erro ao carregar autores: ${e.message}`);
                setLoading(false);
            }
        };
    
        fetchAuthors(); // Chamando a função ao montar o componente
    }, []);

    return (
        <>  
            <Navbar />
            <div className="container">
                <h1>Bem-vindo(a), {name}!</h1>
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
