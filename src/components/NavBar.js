import React from 'react';
import '../Navbar.css';
const NavBar = () => {
    return (
        <nav>
            <div className="logo">Logo</div>
            <div className="tools">Herramientas</div>
            <div className="menu">
                <ul>
                    <li>Juegos</li>
                    <li>Colaboradores</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;