//import { useState, useEffect } from 'react';
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import LoginHome from './Pages/LoginHome';
import Home from './Pages/Home';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Shelf from './Pages/Shelf';

function App() {
  //const [arrAuthors, setAuthors] = useState([]);
  /*
  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  */
  return (
    <>
      <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginHome />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/home' element={<PrivateRoute element={<Home />} />} />
                    <Route path='/shelf' element={<PrivateRoute element={<Shelf />} />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>

      <div className="d-flex justify-content-center align-items-center vh-100">
        {/*
        <div className="card">

          {
            arrAuthors.map((author) => (
              <div key={author._id}>
                <p>{author.name}</p>
                <br />
              </div>
            ))
          }
        </div>*/}
      </div>


    </>
  );
}

export default App;
