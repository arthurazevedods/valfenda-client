import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; 

const Home = () => {
    const location = useLocation();
    const { name, email } = location.state || {};

    return (
        <>  
            <Navbar />
            <div className="container">
                <h1>Bem-vindo, {name}!</h1>
                <p>Email: {email}</p>
            </div>
            
        </>
    );
        
}

export default Home;
