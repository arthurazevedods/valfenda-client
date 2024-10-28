import './css/SignUpLogin.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card card-responsive">
        <div className="form px-4">
          <h3 className="text-center mb-4">LOGIN</h3>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="Email"></input>
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Senha</label>
            <input type="password" className="form-control" id="inputPassword" placeholder="Senha"></input>
          </div>
          <button className="btn btn-dark btn-block w-100">Login</button>

          <div className=" container d-flex justify-content-start align-items-center mt-3">
            <p className="mb-0">Não tem uma conta?</p>
            <Link to='/register' className="btn button-link">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
