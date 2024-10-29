import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';


const LodinHome = () => {
    

    return (
        <>
            <Navbar />
            <div className="container">
                <Link to='/login' className="btn button-link">Login</Link>
            </div>
            
        </>
    );
}

export default LodinHome;
