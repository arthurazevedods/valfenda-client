import Navbar from "../components/Navbar";
import { Link, } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
const API_URL = "https://valfenda-api.onrender.com"
const LodinHome = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Função para buscar os autores do backend
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${API_URL}/authors`);
                setAuthors(response.data); // Armazenando os autores no estado
                setLoading(false); // Parando o loading
            } catch (e) {
                setError(`Erro ao carregar autores: ${e.message}`);
                setLoading(false); // Parando o loading em caso de erro
            }
        };

        fetchAuthors(); // Chamando a função ao montar o componente
    }, []); // O array vazio faz com que o efeito rode uma vez ao montar o componente

    if (loading) return <p>Carregando autores...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <div className="container">

                <Link to='/login' className="btn button-link">Login</Link>
            </div>
            <div className="container">
            <h3>Autores:</h3>
            <ul>
                {authors.map((author) => (
                    <li key={author.id}>{author.name}</li> // Renderizando a lista de autores
                ))}
            </ul>
        </div>
        </>
    );
}

export default LodinHome;
