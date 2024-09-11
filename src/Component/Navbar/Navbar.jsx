import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Navbar.css'; 

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
  
    localStorage.removeItem('userToken');

   
    navigate('/login');
  };


  const isAuthenticated = !!localStorage.getItem('userToken');


  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgb(54, 6, 87)' }}>
      <div className="container-fluid">
        <h1 className="navbar-brand text-white">Klickit</h1>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/productList') ? 'active' : ''}`}
                    to="/productList"
                  >
                    ProductList
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                    to="/admin"
                  >
                    Admin
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="nav-link btn btn-outline-danger text-white" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className={`nav-link btn ${isActive('/login') ? 'active' : 'btn-outline-light'}`} to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
