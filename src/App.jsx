//import { useState, useEffect } from 'react';
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';


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
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
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
