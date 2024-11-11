import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import Card from "../components/Card/Card"; 
import { useEffect, useState } from "react";
import axios from 'axios';

const isLocalhost = window.location.hostname === "localhost";
const API_URL = isLocalhost ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_API_URL;

const Home = () => {
    const location = useLocation();
    const { name, email } = location.state || {};

    const [authors, setAuthors] = useState([]);
    const [shelves, setShelves] = useState([]);
    const [loadingAuthors, setLoadingAuthors] = useState(true);
    const [loadingShelves, setLoadingShelves] = useState(true);
    const [errorAuthors, setErrorAuthors] = useState('');
    const [errorShelves, setErrorShelves] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            const token = localStorage.getItem('token'); 
            console.log("Token na Home:", token);
            try {
                const response = await axios.get(`${API_URL}/authors`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (Array.isArray(response.data)) {
                    setAuthors(response.data);
                } else {
                    setErrorAuthors("Erro: formato de dados inesperado");
                }
            } catch (e) {
                setErrorAuthors(`Erro ao carregar autores: ${e.message}`);
            } finally {
                setLoadingAuthors(false);
            }
        };

        const fetchShelves = async () => {
            const token = localStorage.getItem('token');
            console.log("Token ao buscar estantes:", token); // Log para verificar o token
        
            if (!token) {
                setErrorShelves("Token não encontrado. Faça login novamente.");
                return;
            }
        
            try {
                const response = await axios.get(`${API_URL}/shelves`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
                    },
                });
                if (Array.isArray(response.data)) {
                    setShelves(response.data);
                } else {
                    setErrorShelves("Erro: formato de dados inesperado");
                }
            } catch (e) {
                setErrorShelves(`Erro ao carregar estantes: ${e.response?.data?.message || e.message}`);
            } finally {
                setLoadingShelves(false);
            }
        };
        
        

        fetchAuthors();
        fetchShelves();
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
                {loadingAuthors && <p>Carregando autores...</p>}
                {errorAuthors && <p>{errorAuthors}</p>}
                {!loadingAuthors && !errorAuthors && (
                    <ul>
                        {authors.map((author) => (
                            <li key={author._id}>{author.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="container">
                <h3>Estantes:</h3>
                {loadingShelves && <p>Carregando estantes...</p>}
                {errorShelves && <p>{errorShelves}</p>}
                {!loadingShelves && !errorShelves && (
                    <ul>
                        {shelves.map((shelf) => (
                            <Card key={shelf.id} nome={shelf.name}/>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Home;
